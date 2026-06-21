import { motion } from "framer-motion";

import { HomeBenefits } from "@/components/home/home-benefits";
import { HeroCard } from "@/components/home/hero-card";

import {
  fadeUp,
  springTransition,
} from "@/lib/animations";

import { MovieWatchProvidersResult } from "@/types/movie";

type HeroMovie = {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  genreLabel: string;
  ageRating: string;
};

type Props = {
  heroMovie: HeroMovie;
  heroMovies: HeroMovie[];
  heroDuration: number;
  heroProviders: MovieWatchProvidersResult | null;
  onPick: () => void;
  onSearch: () => void;
  onScrollToFilters: () => void;
};

export function HeroSection({
  heroMovie,
  heroMovies,
  heroDuration,
  heroProviders,
  onPick,
  onSearch,
  onScrollToFilters,
}: Props) {
  return (
    <section className="grid min-h-[78vh] items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
      <motion.div
        variants={fadeUp}
        transition={springTransition}
      >
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-zinc-200">
          <span>🎲</span>

          <span>
            Uma escolha. Menos indecisão.
          </span>
        </div>

        <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Pare de perder{" "}
          <span className="text-red-600">
            tempo escolhendo
          </span>{" "}
          o que assistir.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl">
          Receba recomendações inteligentes,
          descubra onde assistir e encontre algo
          bom para ver em segundos.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onPick}
            className="group rounded-2xl bg-red-600 px-7 py-4 text-base font-black text-white shadow-2xl shadow-red-600/20 transition hover:scale-[1.03] hover:bg-red-500 active:scale-[0.98]"
          >
            🎲 Escolher por mim

            <span className="ml-3 inline-block transition group-hover:translate-x-1">
              →
            </span>
          </button>

          <button
            type="button"
            onClick={onSearch}
            className="group rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:scale-[1.03] hover:border-white/30 hover:bg-white/10 active:scale-[0.98]"
          >
            🔎 Pesquisar título

            <span className="ml-3 inline-block transition group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={onScrollToFilters}
          className="mt-5 text-sm font-medium text-zinc-400 transition hover:text-white"
        >
          ⚙️ Quero ajustar os filtros primeiro
        </button>

        <HomeBenefits />
      </motion.div>

      <HeroCard
        heroMovie={heroMovie}
        heroMovies={heroMovies}
        heroDuration={heroDuration}
        heroProviders={heroProviders}
        onPick={onPick}
      />
    </section>
  );
}