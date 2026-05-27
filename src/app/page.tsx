"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

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

import { getGenres } from "@/services/tmdb";

import { Genre } from "@/types/movie";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [genres, setGenres] = useState<Genre[]>([]);

  const [minRating, setMinRating] = useState(
    Number(searchParams.get("rating") || 6)
  );

  const [selectedGenre, setSelectedGenre] =
    useState<number | null>(
      searchParams.get("genre")
        ? Number(searchParams.get("genre"))
        : null
    );

  const [selectedProvider, setSelectedProvider] =
    useState<number | null>(
      searchParams.get("provider")
        ? Number(searchParams.get("provider"))
        : null
    );

  const [selectedRuntime, setSelectedRuntime] =
    useState(
      JSON.stringify({
        min: searchParams.get("minRuntime")
          ? Number(searchParams.get("minRuntime"))
          : null,
        max: searchParams.get("maxRuntime")
          ? Number(searchParams.get("maxRuntime"))
          : null,
      })
    );

  const [selectedYear, setSelectedYear] =
    useState(
      JSON.stringify({
        min: searchParams.get("minYear")
          ? Number(searchParams.get("minYear"))
          : null,
        max: searchParams.get("maxYear")
          ? Number(searchParams.get("maxYear"))
          : null,
      })
    );

  useEffect(() => {
    async function loadGenres() {
      try {
        const genresData = await getGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Erro ao carregar gêneros:", error);
      }
    }

    loadGenres();
  }, []);

  function handlePickMovie() {
    const params = new URLSearchParams();

    params.set("rating", String(minRating));

    if (selectedGenre) {
      params.set("genre", String(selectedGenre));
    }

    if (selectedProvider) {
      params.set("provider", String(selectedProvider));
    }

    const runtime = JSON.parse(selectedRuntime);

    if (runtime.min !== null) {
      params.set("minRuntime", String(runtime.min));
    }

    if (runtime.max !== null) {
      params.set("maxRuntime", String(runtime.max));
    }

    const year = JSON.parse(selectedYear);

    if (year.min !== null) {
      params.set("minYear", String(year.min));
    }

    if (year.max !== null) {
      params.set("maxYear", String(year.max));
    }

    router.push(`/pick?${params.toString()}`);
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-28 pt-32 text-white md:pb-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-6xl"
        >
          <motion.header
            variants={fadeUp}
            transition={springTransition}
            className="mb-10 flex flex-col items-center text-center"
          >
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Velunix
            </h1>

            <p className="mt-4 max-w-2xl text-base text-zinc-400 md:text-lg">
              Encontre algo bom para assistir sem perder tempo escolhendo.
            </p>
          </motion.header>

          <div className="grid gap-5 md:grid-cols-2">
            <RatingFilter
              minRating={minRating}
              setMinRating={setMinRating}
            />

            <GenreFilter
              genres={genres}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
            />

            <ProviderFilter
              providers={STREAMING_OPTIONS}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
            />

            <RuntimeFilter
              selectedRuntime={selectedRuntime}
              setSelectedRuntime={setSelectedRuntime}
            />

            <YearFilter
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          </div>

          <motion.div
            variants={fadeUp}
            transition={springTransition}
            className="mt-10 flex justify-center"
          >
            <AppButton
              onClick={handlePickMovie}
              className="w-full max-w-xs"
            >
              🎲 Escolher Filme
            </AppButton>
          </motion.div>
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