"use client";

import { HowItWorksSection } from "@/components/home/how-it-works-section";

import { FinalCtaSection } from "@/components/home/final-cta-section";

import { HomeBenefits } from "@/components/home/home-benefits";

import { ContentTypeSelector } from "@/components/home/content-type-selector";

import { HeroCard } from "@/components/home/hero-card";

import { HeroSection } from "@/components/home/hero-section";

import {
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  motion,
} from "framer-motion";

import {
  GenreFilter,
  ProviderFilter,
  RatingFilter,
  RuntimeFilter,
  YearFilter,
} from "@/components/filters";

import { Navbar } from "@/components/layout/navbar";
import { AppButton } from "@/components/ui/button";

import { STREAMING_OPTIONS } from "@/constants/providers";

import {
  fadeUp,
  springTransition,
  staggerContainer,
} from "@/lib/animations";

import {
  getGenres,
  getContentDetails,
  getContentWatchProviders,
} from "@/services/tmdb";

import { ContentType } from "@/services/tmdb/types";

import {
  Genre,
  MovieWatchProvidersResult,
} from "@/types/movie";

const HERO_MOVIES = [
  
  {
    id: 157336,
    title: "Interstellar",
    posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.6,
    genreLabel: "Ficção científica",
    ageRating: "12",
  },
  {
    id: 27205,
    title: "A Origem",
    posterPath: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    rating: 8.4,
    genreLabel: "Ficção científica",
    ageRating: "14",
  },
  {
    id: 155,
    title: "Batman: O Cavaleiro das Trevas",
    posterPath: "/iGZX91hIqM9Uu0KGhd4MUaJ0Rtm.jpg",
    rating: 8.5,
    genreLabel: "Ação",
    ageRating: "12",
  },
  {
    id: 244786,
    title: "Whiplash",
    posterPath: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    rating: 8.4,
    genreLabel: "Drama",
    ageRating: "12",
  },
  {
    id: 438631,
    title: "Duna",
    posterPath: "/obhGsx4PE9OzsVGtIfoLAIIWGNb.jpg",
    rating: 7.8,
    genreLabel: "Ficção científica",
    ageRating: "14",
  },
  {
    id: 475557,
    title: "Coringa",
    posterPath: "/xLxgVxFWvb9hhUyCDDXxRPPnFck.jpg",
    rating: 8.1,
    genreLabel: "Drama",
    ageRating: "16",
  },
];

function getInitialContentType(
  value: string | null
): ContentType {
  if (
    value === "movie" ||
    value === "tv" ||
    value === "anime"
  ) {
    return value;
  }

  return "movie";
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [heroMovie, setHeroMovie] =
    useState(HERO_MOVIES[0]);

 useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * HERO_MOVIES.length
    );

    setHeroMovie(HERO_MOVIES[randomIndex]);

    const interval = setInterval(() => {
      setHeroMovie((currentMovie) => {
        const currentIndex =
          HERO_MOVIES.findIndex(
            (movie) =>
              movie.id === currentMovie.id
          );

        const nextIndex =
          (currentIndex + 1) %
          HERO_MOVIES.length;

        return HERO_MOVIES[nextIndex];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const [genres, setGenres] =
    useState<Genre[]>([]);

  const [heroDuration, setHeroDuration] =
    useState(0);

  const [
    heroProviders,
    setHeroProviders,
  ] =
    useState<MovieWatchProvidersResult | null>(
      null
    );

  const [contentType, setContentType] =
    useState<ContentType>(
      getInitialContentType(
        searchParams.get("type")
      )
    );

  const [minRating, setMinRating] =
    useState(
      Number(
        searchParams.get("rating") ||
          6
      )
    );

  const [
    selectedGenre,
    setSelectedGenre,
  ] = useState<number | null>(
    searchParams.get("genre")
      ? Number(
          searchParams.get("genre")
        )
      : null
  );

  const [
    selectedProvider,
    setSelectedProvider,
  ] = useState<number | null>(
    searchParams.get("provider")
      ? Number(
          searchParams.get(
            "provider"
          )
        )
      : null
  );

  const [
    selectedRuntime,
    setSelectedRuntime,
  ] = useState(
    JSON.stringify({
      min: searchParams.get(
        "minRuntime"
      )
        ? Number(
            searchParams.get(
              "minRuntime"
            )
          )
        : null,

      max: searchParams.get(
        "maxRuntime"
      )
        ? Number(
            searchParams.get(
              "maxRuntime"
            )
          )
        : null,
    })
  );

  const [
    selectedYear,
    setSelectedYear,
  ] = useState(
    JSON.stringify({
      min: searchParams.get("minYear")
        ? Number(
            searchParams.get(
              "minYear"
            )
          )
        : null,

      max: searchParams.get("maxYear")
        ? Number(
            searchParams.get(
              "maxYear"
            )
          )
        : null,
    })
  );

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [
          genresData,
          details,
          providers,
        ] = await Promise.all([
          getGenres(),
         getContentDetails(heroMovie.id, "movie"),
          getContentWatchProviders(heroMovie.id, "movie"),
        ]);

        setGenres(genresData);

        setHeroDuration(
          details.runtime || 0
        );

        setHeroProviders(providers);
      } catch (error) {
        console.error(
          "Erro ao carregar home:",
          error
        );
      }
    }

    loadHomeData();
  }, [heroMovie.id]);

  function buildPickParams() {
    const params =
      new URLSearchParams();

    params.set("type", contentType);

    params.set(
      "rating",
      String(minRating)
    );

    if (selectedGenre) {
      params.set(
        "genre",
        String(selectedGenre)
      );
    }

    if (selectedProvider) {
      params.set(
        "provider",
        String(selectedProvider)
      );
    }

    const runtime =
      JSON.parse(selectedRuntime);

    if (runtime.min !== null) {
      params.set(
        "minRuntime",
        String(runtime.min)
      );
    }

    if (runtime.max !== null) {
      params.set(
        "maxRuntime",
        String(runtime.max)
      );
    }

    const year =
      JSON.parse(selectedYear);

    if (year.min !== null) {
      params.set(
        "minYear",
        String(year.min)
      );
    }

    if (year.max !== null) {
      params.set(
        "maxYear",
        String(year.max)
      );
    }

    return params;
  }

  function handlePickMovie() {
    const params =
      buildPickParams();

    router.push(
      `/pick?${params.toString()}`
    );
  }

  function handleSearchMovie() {
    router.push("/search");
  }

  function scrollToFilters() {
    document
      .getElementById("filters")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-28 pt-28 text-white md:pb-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-7xl"
        >
          <HeroSection
            heroMovie={heroMovie}
            heroMovies={HERO_MOVIES}
            heroDuration={heroDuration}
            heroProviders={heroProviders}
            onPick={handlePickMovie}
            onSearch={handleSearchMovie}
            onScrollToFilters={scrollToFilters}
          />

          <HowItWorksSection />

          <motion.section
            id="filters"
            variants={fadeUp}
            transition={
              springTransition
            }
            className="mt-10 scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8"
          >
            <div className="mb-8 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-red-500">
                Personalize
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Escolha o que assistir
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
                Escolha filmes, séries ou animes. Depois ajuste os filtros se quiser uma recomendação mais precisa.
              </p>
            </div>

            <ContentTypeSelector
              contentType={contentType}
              setContentType={setContentType}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <RatingFilter
                minRating={minRating}
                setMinRating={
                  setMinRating
                }
              />

              <GenreFilter
                genres={genres}
                selectedGenre={
                  selectedGenre
                }
                setSelectedGenre={
                  setSelectedGenre
                }
              />

              <ProviderFilter
                providers={
                  STREAMING_OPTIONS
                }
                selectedProvider={
                  selectedProvider
                }
                setSelectedProvider={
                  setSelectedProvider
                }
              />

              <RuntimeFilter
                selectedRuntime={
                  selectedRuntime
                }
                setSelectedRuntime={
                  setSelectedRuntime
                }
              />

              <YearFilter
                selectedYear={
                  selectedYear
                }
                setSelectedYear={
                  setSelectedYear
                }
              />
            </div>

            <div className="mt-8 flex justify-center">
              <AppButton
                onClick={handlePickMovie}
                className="w-full max-w-xs"
              >
                🎲 Escolher
              </AppButton>
            </div>
          </motion.section>

          <FinalCtaSection
            onPick={handlePickMovie}
            onSearch={handleSearchMovie}
          />
        </motion.div>
      </main>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          Carregando...
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}