"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { Navbar } from "@/components/layout/navbar";
import { LoginPrompt } from "@/components/layout/login-prompt";

import { MovieCard } from "@/components/movie/movie-card";
import { MovieCardSkeleton } from "@/components/movie/movie-card-skeleton";

import { AppButton } from "@/components/ui/button";

import {
  cardAnimation,
  springTransition,
} from "@/lib/animations";

import { getSession } from "@/services/auth";

import {
  isFavoriteMovieRemote,
  toggleFavoriteMovieRemote,
} from "@/services/favorites";

import {
  isWatchedMovieRemote,
  toggleWatchedMovieRemote,
} from "@/services/watched";

import {
  discoverMovies,
  getMovieById,
  getMovieDetails,
  getMovieTrailer,
  getMovieWatchProviders,
} from "@/services/tmdb";

import {
  Movie,
  MovieWatchProvidersResult,
} from "@/types/movie";

import {
  canGuestRoll,
  getRemainingGuestRolls,
  incrementGuestRolls,
} from "@/utils/guest-limits";

import { isValidMovie } from "@/utils/is-valid-movie";

import {
  addSeenMovieId,
  filterUnseenMovies,
} from "@/utils/movie-cache";

import { isFavoriteMovie } from "@/utils/favorite-movies";
import { isWatchedMovie } from "@/utils/watched-movies";
import { pickRandom } from "@/utils/pick-random";

import { sortMoviesByScore } from "@/utils/movie-score";

function parseNumberParam(
  value: string | null,
  fallback = 0
) {
  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : fallback;
}

function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.min(
    Math.max(value, min),
    max
  );
}

function PickContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Evita execução dupla no Strict Mode durante desenvolvimento.
  const hasLoadedMovies = useRef(false);

  const rawRating =
    parseNumberParam(
      searchParams.get("rating"),
      6
    );

  const rating =
    rawRating >= 0 && rawRating <= 10
      ? rawRating
      : 6;

const genre = parseNumberParam(
  searchParams.get("genre")
);

const provider = parseNumberParam(
  searchParams.get("provider")
);

const minRuntime = searchParams.get("minRuntime")
  ? clamp(
      parseNumberParam(searchParams.get("minRuntime")),
      0,
      400
    )
  : 0;

const maxRuntime = searchParams.get("maxRuntime")
  ? clamp(
      parseNumberParam(searchParams.get("maxRuntime")),
      0,
      400
    )
  : 0;

const currentYear = new Date().getFullYear();

const minYear = searchParams.get("minYear")
  ? clamp(
      parseNumberParam(searchParams.get("minYear")),
      1888,
      currentYear
    )
  : 0;

const maxYear = searchParams.get("maxYear")
  ? clamp(
      parseNumberParam(searchParams.get("maxYear")),
      1888,
      currentYear
    )
  : 0;

const movieIdFromUrl = parseNumberParam(
  searchParams.get("movieId")
);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);

  const [duration, setDuration] = useState(0);
  const [ageRating, setAgeRating] = useState("Livre");
  const [trailerKey, setTrailerKey] = useState("");

  const [watchProviders, setWatchProviders] =
    useState<MovieWatchProvidersResult | null>(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingMovieData, setLoadingMovieData] =
    useState(false);

  const [loginPromptOpen, setLoginPromptOpen] =
    useState(false);

  const [guestLimitReached, setGuestLimitReached] =
    useState(false);

  const [remainingRolls, setRemainingRolls] =
    useState(5);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  function updateMovieIdInUrl(movieId: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("movieId", String(movieId));

    router.replace(`/pick?${params.toString()}`);
  }

  async function getAvailableMovies() {
    const results = await discoverMovies({
      minRating: rating,
      genreId: genre || null,
      providerId: provider || null,
      minRuntime: minRuntime || null,
      maxRuntime: maxRuntime || null,
      minYear: minYear || null,
      maxYear: maxYear || null,
    });

    const validMovies = sortMoviesByScore(
      results.filter(isValidMovie)
    );

    const unseenMovies =
      filterUnseenMovies(validMovies);

    return unseenMovies.length > 0
      ? unseenMovies
      : validMovies;
  }

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const session = await getSession();
        const authenticated = !!session;

        setIsAuthenticated(authenticated);
        setRemainingRolls(getRemainingGuestRolls());

        if (!authenticated && !canGuestRoll()) {
          setGuestLimitReached(true);
          setLoginPromptOpen(true);
          return;
        }

        // Se a URL tem movieId, restaura exatamente esse filme.
        if (movieIdFromUrl) {
          try {
            const restoredMovie =
              await getMovieById(movieIdFromUrl);

            await loadMovieData(
              restoredMovie,
              authenticated,
              false
            );

            return;
          } catch {
            const params = new URLSearchParams(
              searchParams.toString()
            );

            params.delete("movieId");

            router.replace(
              `/pick?${params.toString()}`
            );
          }
        }

        const availableMovies =
          await getAvailableMovies();

        setMovies(availableMovies);

        const randomMovie =
          pickRandom(availableMovies);

        if (!randomMovie) {
          setMovie(null);
          return;
        }

        if (!authenticated) {
          incrementGuestRolls();
          setRemainingRolls(getRemainingGuestRolls());
        }

        updateMovieIdInUrl(randomMovie.id);

        await loadMovieData(
          randomMovie,
          authenticated,
          true
        );
      } catch (error) {
        console.error(
          "Erro ao carregar filmes:",
          error instanceof Error
            ? error.message
            : JSON.stringify(error)
        );
      } finally {
        setLoading(false);
      }
    }

    if (hasLoadedMovies.current) {
      return;
    }

    hasLoadedMovies.current = true;

    loadMovies();
  }, [
    rating,
    genre,
    provider,
    minRuntime,
    maxRuntime,
    minYear,
    maxYear,
    movieIdFromUrl,
  ]);

  async function loadMovieData(
    selectedMovie: Movie,
    authenticated = isAuthenticated,
    markAsSeen = true
  ) {
    setLoadingMovieData(true);

    setMovie(selectedMovie);

    if (markAsSeen) {
      addSeenMovieId(selectedMovie.id);
    }

    // Estados do usuário: remoto para logado, local para guest.
    if (authenticated) {
      const [remoteFavorite, remoteWatched] =
        await Promise.all([
          isFavoriteMovieRemote(selectedMovie.id),
          isWatchedMovieRemote(selectedMovie.id),
        ]);

      setIsFavorite(remoteFavorite);
      setIsWatched(remoteWatched);
    } else {
      setIsFavorite(
        isFavoriteMovie(selectedMovie.id)
      );

      setIsWatched(
        isWatchedMovie(selectedMovie.id)
      );
    }

    // Limpa dados do filme anterior antes de buscar os novos.
    setDuration(0);
    setAgeRating("Livre");
    setTrailerKey("");
    setWatchProviders(null);

    try {
      const [details, trailer, providers] =
        await Promise.all([
          getMovieDetails(selectedMovie.id),
          getMovieTrailer(selectedMovie.id),
          getMovieWatchProviders(selectedMovie.id),
        ]);

      setDuration(details.runtime || 0);
      setAgeRating(details.ageRating || "Livre");
      setTrailerKey(trailer?.key || "");
      setWatchProviders(providers);
    } catch (error) {
      console.error(
        "Erro ao carregar filme:",
        error instanceof Error
          ? error.message
          : JSON.stringify(error)
      );
    } finally {
      setLoadingMovieData(false);
    }
  }

  async function rerollMovie() {
    if (!isAuthenticated && !canGuestRoll()) {
      setGuestLimitReached(true);
      setLoginPromptOpen(true);
      setRemainingRolls(getRemainingGuestRolls());
      return;
    }

    let availableMovies = movies
      .filter(isValidMovie)
      .filter((item) => item.id !== movie?.id);

    availableMovies =
      filterUnseenMovies(availableMovies);

    // Quando a página veio só com movieId, ainda não existe pool local.
    if (availableMovies.length === 0) {
      availableMovies =
        await getAvailableMovies();

      availableMovies =
        availableMovies.filter(
          (item) => item.id !== movie?.id
        );

      setMovies(availableMovies);
    }

    const randomMovie =
      pickRandom(availableMovies);

    if (!randomMovie) {
      return;
    }

    if (!isAuthenticated) {
      incrementGuestRolls();
      setRemainingRolls(getRemainingGuestRolls());
    }

    updateMovieIdInUrl(randomMovie.id);

    await loadMovieData(
      randomMovie,
      isAuthenticated,
      true
    );
  }

  async function handleToggleFavorite() {
    if (!movie) {
      return;
    }

    if (!isAuthenticated) {
      setLoginPromptOpen(true);
      return;
    }

    try {
      const result =
        await toggleFavoriteMovieRemote(movie.id);

      setIsFavorite(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleToggleWatched() {
    if (!movie) {
      return;
    }

    if (!isAuthenticated) {
      setLoginPromptOpen(true);
      return;
    }

    try {
      const result =
        await toggleWatchedMovieRemote(movie.id);

      setIsWatched(result);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading || loadingMovieData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black p-6">
        <MovieCardSkeleton />
      </main>
    );
  }

  if (guestLimitReached) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black p-6">
        <LoginPrompt
          open={true}
          onClose={() => router.push("/")}
        />
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-black via-zinc-950 to-black p-6 text-center text-white">
        <p className="text-zinc-400">
          Nenhum filme encontrado para esses filtros.
        </p>

        <AppButton
          variant="secondary"
          onClick={() => router.back()}
        >
          ← Voltar
        </AppButton>
      </main>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black p-6 pb-28 text-white md:pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            variants={cardAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={springTransition}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-sm text-zinc-400">
              {isAuthenticated
                ? "Sorteios ilimitados desbloqueados ✨"
                : remainingRolls > 0
                  ? `${remainingRolls} sorteios grátis restantes`
                  : "Limite grátis atingido"}
            </p>

            <MovieCard
              movieId={movie.id}
              title={movie.title}
              description={movie.overview}
              rating={movie.vote_average}
              duration={duration}
              ageRating={ageRating}
              posterPath={movie.poster_path}
              watchProviders={watchProviders}
              trailerUrl={
                trailerKey
                  ? `https://www.youtube.com/watch?v=${trailerKey}`
                  : undefined
              }
              onReroll={rerollMovie}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              isWatched={isWatched}
              onToggleWatched={handleToggleWatched}
            />

            <AppButton
              variant="ghost"
              onClick={() => {
                const params = new URLSearchParams(
                  searchParams.toString()
                );

                params.delete("movieId");

                router.push(`/?${params.toString()}`);
              }}
            >
              ← Voltar aos filtros
            </AppButton>
            
          </motion.div>
        </AnimatePresence>

        <LoginPrompt
          open={loginPromptOpen}
          onClose={() => setLoginPromptOpen(false)}
        />
      </main>
    </>
  );
}

export default function PickPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          Carregando...
        </main>
      }
    >
      <PickContent />
    </Suspense>
  );
}