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

import { usePostHog } from "posthog-js/react";

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
  getContentById,
  getContentDetails,
  getContentTrailer,
  getContentWatchProviders,
} from "@/services/tmdb";

import { ContentType } from "@/services/tmdb/types";

import {
  Movie,
  MovieWatchProvidersResult,
} from "@/types/movie";

import {
  canGuestRoll,
  getRemainingGuestRolls,
  incrementGuestRolls,
} from "@/utils/guest-limits";

import {
  addSeenMovieId,
  filterUnseenMovies,
} from "@/utils/movie-cache";

import { isFavoriteMovie } from "@/utils/favorite-movies";
import { isWatchedMovie } from "@/utils/watched-movies";
import { pickRandom } from "@/utils/pick-random";

import { sortMoviesByScore } from "@/utils/movie-score";

type TmdbContent = Movie & {
  name?: string;
  first_air_date?: string;
};

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

function getContentType(
  value: string | null
): ContentType {
  if (
    value === "tv" ||
    value === "anime"
  ) {
    return value;
  }

  return "movie";
}

function getContentTitle(
  content: Movie | null
) {
  if (!content) {
    return "";
  }

  const item =
    content as TmdbContent;

  return (
    item.title ||
    item.name ||
    "Título não encontrado"
  );
}

function isValidContent(
  content: Movie
): boolean {
  const item =
    content as TmdbContent;

  if (!item.id) {
    return false;
  }

  if (
    !item.title?.trim() &&
    !item.name?.trim()
  ) {
    return false;
  }

  if (!item.overview?.trim()) {
    return false;
  }

  if (!item.poster_path) {
    return false;
  }

  if (
    !item.vote_average ||
    item.vote_average <= 0
  ) {
    return false;
  }

  return true;
}

function PickContent() {
  const router = useRouter();
  const searchParams =
    useSearchParams();

  const posthog = usePostHog();

  const hasLoadedMovies =
    useRef(false);

  const contentType =
    getContentType(
      searchParams.get("type")
    );

  const rawRating =
    parseNumberParam(
      searchParams.get("rating"),
      6
    );

  const rating =
    rawRating >= 0 && rawRating <= 10
      ? rawRating
      : 6;

  const genre =
    parseNumberParam(
      searchParams.get("genre")
    );

  const provider =
    parseNumberParam(
      searchParams.get("provider")
    );

  const minRuntime =
    searchParams.get("minRuntime")
      ? clamp(
          parseNumberParam(
            searchParams.get("minRuntime")
          ),
          0,
          400
        )
      : 0;

  const maxRuntime =
    searchParams.get("maxRuntime")
      ? clamp(
          parseNumberParam(
            searchParams.get("maxRuntime")
          ),
          0,
          400
        )
      : 0;

  const currentYear =
    new Date().getFullYear();

  const minYear =
    searchParams.get("minYear")
      ? clamp(
          parseNumberParam(
            searchParams.get("minYear")
          ),
          1888,
          currentYear
        )
      : 0;

  const maxYear =
    searchParams.get("maxYear")
      ? clamp(
          parseNumberParam(
            searchParams.get("maxYear")
          ),
          1888,
          currentYear
        )
      : 0;

  const movieIdFromUrl =
    parseNumberParam(
      searchParams.get("movieId")
    );

  const [movies, setMovies] =
    useState<Movie[]>([]);

  const [movie, setMovie] =
    useState<Movie | null>(null);

  const [duration, setDuration] =
    useState(0);

  const [ageRating, setAgeRating] =
    useState("Livre");

  const [trailerKey, setTrailerKey] =
    useState("");

  const [
    watchProviders,
    setWatchProviders,
  ] =
    useState<MovieWatchProvidersResult | null>(
      null
    );

  const [isFavorite, setIsFavorite] =
    useState(false);

  const [isWatched, setIsWatched] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [
    loadingMovieData,
    setLoadingMovieData,
  ] = useState(false);

  const [
    loginPromptOpen,
    setLoginPromptOpen,
  ] = useState(false);

  const [
    guestLimitReached,
    setGuestLimitReached,
  ] = useState(false);

  const [
    remainingRolls,
    setRemainingRolls,
  ] = useState(5);

  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);

  function updateMovieIdInUrl(
    movieId: number
  ) {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "type",
      contentType
    );

    params.set(
      "movieId",
      String(movieId)
    );

    router.replace(
      `/pick?${params.toString()}`
    );
  }

  function trackMovieRecommended(
    selectedMovie: Movie,
    source: "initial" | "reroll"
  ) {
    posthog.capture(
      "movie_recommended",
      {
        source,
        content_type: contentType,
        movie_id:
          selectedMovie.id,
        movie_title:
          getContentTitle(
            selectedMovie
          ),
        movie_rating:
          selectedMovie.vote_average,
        selected_min_rating:
          rating,
        genre_id: genre || null,
        provider_id:
          provider || null,
        min_runtime:
          minRuntime || null,
        max_runtime:
          maxRuntime || null,
        min_year:
          minYear || null,
        max_year:
          maxYear || null,
        is_authenticated:
          isAuthenticated,
      }
    );
  }

  async function getAvailableMovies() {
    const results =
      await discoverMovies({
        contentType,

        minRating: rating,

        genreId: genre || null,

        providerId:
          provider || null,

        minRuntime:
          minRuntime || null,

        maxRuntime:
          maxRuntime || null,

        minYear:
          minYear || null,

        maxYear:
          maxYear || null,
      });

    const validMovies =
      sortMoviesByScore(
        results.filter(
          isValidContent
        )
      );

    const unseenMovies =
      filterUnseenMovies(
        validMovies
      );

    return unseenMovies.length > 0
      ? unseenMovies
      : validMovies;
  }

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const session =
          await getSession();

        const authenticated =
          !!session;

        setIsAuthenticated(
          authenticated
        );

        setRemainingRolls(
          getRemainingGuestRolls()
        );

        if (
          !authenticated &&
          !canGuestRoll()
        ) {
          setGuestLimitReached(true);
          setLoginPromptOpen(true);
          return;
        }

        /**
         * Por enquanto, restauração direta por ID
         * usa endpoint de filme.
         * Para séries/animes, removemos o ID e sorteamos novamente.
         */
        if (movieIdFromUrl) {
          try {
            const restoredContent =
              await getContentById(
                movieIdFromUrl,
                contentType
              );

            await loadMovieData(
              restoredContent,
              authenticated,
              false
            );

            return;
          } catch {
            const params =
              new URLSearchParams(
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

        setMovies(
          availableMovies
        );

        const randomMovie =
          pickRandom(
            availableMovies
          );

        if (!randomMovie) {
          setMovie(null);
          return;
        }

        if (!authenticated) {
          incrementGuestRolls();

          setRemainingRolls(
            getRemainingGuestRolls()
          );
        }

        updateMovieIdInUrl(
          randomMovie.id
        );

        await loadMovieData(
          randomMovie,
          authenticated,
          true
        );

        trackMovieRecommended(
          randomMovie,
          "initial"
        );
      } catch (error) {
        console.error(
          "Erro ao carregar conteúdos:",
          error instanceof Error
            ? error.message
            : JSON.stringify(error)
        );
      } finally {
        setLoading(false);
      }
    }

    if (
      hasLoadedMovies.current
    ) {
      return;
    }

    hasLoadedMovies.current =
      true;

    loadMovies();
  }, [
    contentType,
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
    authenticated =
      isAuthenticated,
    markAsSeen = true
  ) {
    setLoadingMovieData(true);

    setMovie(selectedMovie);

    if (markAsSeen) {
      addSeenMovieId(
        selectedMovie.id
      );
    }

    if (authenticated) {
      const [
        remoteFavorite,
        remoteWatched,
      ] = await Promise.all([
        isFavoriteMovieRemote(
          selectedMovie.id
        ),
        isWatchedMovieRemote(
          selectedMovie.id
        ),
      ]);

      setIsFavorite(
        remoteFavorite
      );

      setIsWatched(
        remoteWatched
      );
    } else {
      setIsFavorite(
        isFavoriteMovie(
          selectedMovie.id
        )
      );

      setIsWatched(
        isWatchedMovie(
          selectedMovie.id
        )
      );
    }

    setDuration(0);
    setAgeRating("Livre");
    setTrailerKey("");
    setWatchProviders(null);

    try {
      const [
        details,
        trailer,
        providers,
      ] = await Promise.all([
        getContentDetails(
          selectedMovie.id,
          contentType
        ),

       getContentTrailer(
        selectedMovie.id,
        contentType
      ),

        getContentWatchProviders(
          selectedMovie.id,
          contentType
        ),
      ]);

      setDuration(
        details.runtime || 0
      );

      setAgeRating(
        details.ageRating ||
          "Livre"
      );

      setTrailerKey(
        trailer?.key || ""
      );

      setWatchProviders(
        providers
      );
    } catch (error) {
      console.error(
        "Erro ao carregar conteúdo:",
        error instanceof Error
          ? error.message
          : JSON.stringify(error)
      );
    } finally {
      setLoadingMovieData(false);
    }
  }

  async function rerollMovie() {
    if (
      !isAuthenticated &&
      !canGuestRoll()
    ) {
      setGuestLimitReached(true);
      setLoginPromptOpen(true);

      setRemainingRolls(
        getRemainingGuestRolls()
      );

      return;
    }

    let availableMovies =
      movies
        .filter(
          isValidContent
        )
        .filter(
          (item) =>
            item.id !==
            movie?.id
        );

    availableMovies =
      filterUnseenMovies(
        availableMovies
      );

    if (
      availableMovies.length ===
      0
    ) {
      availableMovies =
        await getAvailableMovies();

      availableMovies =
        availableMovies.filter(
          (item) =>
            item.id !==
            movie?.id
        );

      setMovies(
        availableMovies
      );
    }

    const randomMovie =
      pickRandom(
        availableMovies
      );

    if (!randomMovie) {
      return;
    }

    if (!isAuthenticated) {
      incrementGuestRolls();

      setRemainingRolls(
        getRemainingGuestRolls()
      );
    }

    updateMovieIdInUrl(
      randomMovie.id
    );

    await loadMovieData(
      randomMovie,
      isAuthenticated,
      true
    );

    trackMovieRecommended(
      randomMovie,
      "reroll"
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
        await toggleFavoriteMovieRemote(
          movie.id
        );

      setIsFavorite(result);

      posthog.capture(
        result
          ? "movie_favorited"
          : "movie_unfavorited",
        {
          content_type:
            contentType,
          movie_id: movie.id,
          movie_title:
            getContentTitle(
              movie
            ),
          rating:
            movie.vote_average,
        }
      );
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
        await toggleWatchedMovieRemote(
          movie.id
        );

      setIsWatched(result);

      posthog.capture(
        result
          ? "movie_marked_watched"
          : "movie_unmarked_watched",
        {
          content_type:
            contentType,
          movie_id: movie.id,
          movie_title:
            getContentTitle(
              movie
            ),
          rating:
            movie.vote_average,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  if (
    loading ||
    loadingMovieData
  ) {
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
          onClose={() =>
            router.push("/")
          }
        />
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-black via-zinc-950 to-black p-6 text-center text-white">
        <p className="text-zinc-400">
          Nenhum título encontrado para esses filtros.
        </p>

        <AppButton
          variant="secondary"
          onClick={() =>
            router.back()
          }
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
            variants={
              cardAnimation
            }
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={
              springTransition
            }
            className="flex flex-col items-center gap-6"
          >
            <p className="text-sm text-zinc-400">
              {isAuthenticated
                ? "Recomendações desbloqueadas ✨"
                : remainingRolls >
                    0
                  ? `${remainingRolls} recomendações grátis restantes`
                  : "Limite grátis atingido"}
            </p>

            <MovieCard
              movieId={movie.id}
              title={getContentTitle(
                movie
              )}
              description={
                movie.overview
              }
              rating={
                movie.vote_average
              }
              duration={
                duration
              }
              ageRating={
                ageRating
              }
              posterPath={
                movie.poster_path
              }
              watchProviders={
                watchProviders
              }
              trailerUrl={
                trailerKey
                  ? `https://www.youtube.com/watch?v=${trailerKey}`
                  : undefined
              }
              onReroll={
                rerollMovie
              }
              isFavorite={
                isFavorite
              }
              onToggleFavorite={
                handleToggleFavorite
              }
              isWatched={
                isWatched
              }
              onToggleWatched={
                handleToggleWatched
              }
            />

            <AppButton
              variant="ghost"
              onClick={() => {
                const params =
                  new URLSearchParams(
                    searchParams.toString()
                  );

                params.delete(
                  "movieId"
                );

                router.push(
                  `/?${params.toString()}`
                );
              }}
            >
              ← Voltar aos filtros
            </AppButton>
          </motion.div>
        </AnimatePresence>

        <LoginPrompt
          open={
            loginPromptOpen
          }
          onClose={() =>
            setLoginPromptOpen(
              false
            )
          }
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