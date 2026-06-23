"use client";

import { Suspense } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { motion } from "framer-motion";

import { FinalCtaSection } from "@/components/home/final-cta-section";
import { FiltersSection } from "@/components/home/filters-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";

import { Navbar } from "@/components/layout/navbar";

import { useHomeFilters } from "@/hooks/use-home-filters";
import { useHomeGenres } from "@/hooks/use-home-genres";
import { useHomeHero } from "@/hooks/use-home-hero";

import { staggerContainer } from "@/lib/animations";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = useHomeFilters(searchParams);
  const hero = useHomeHero();

  const {
  contentType,
  setContentType,

  minRating,
  setMinRating,

  selectedGenre,
  setSelectedGenre,

  selectedAnimeGenre,
  setSelectedAnimeGenre,

  selectedProvider,
  setSelectedProvider,

  selectedRuntime,
  setSelectedRuntime,

  selectedYear,
  setSelectedYear,

  handlePickMovie,
} = filters;

  const genres = useHomeGenres(contentType);

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
            heroMovie={hero.heroMovie}
            heroMovies={hero.heroMovies}
            heroDuration={hero.heroDuration}
            heroProviders={hero.heroProviders}
            onPick={handlePickMovie}
            onSearch={handleSearchMovie}
            onScrollToFilters={scrollToFilters}
          />

          <HowItWorksSection />

          <FiltersSection
            contentType={contentType}
            setContentType={setContentType}
            genres={genres}
            minRating={minRating}
            setMinRating={setMinRating}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedAnimeGenre={selectedAnimeGenre}
            setSelectedAnimeGenre={setSelectedAnimeGenre}
            selectedProvider={selectedProvider}
            setSelectedProvider={setSelectedProvider}
            selectedRuntime={selectedRuntime}
            setSelectedRuntime={setSelectedRuntime}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            onPick={handlePickMovie}
          />

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