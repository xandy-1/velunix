import { motion } from "framer-motion";

import { AnimeFilters } from "@/components/filters/anime/anime-filters";
import { MovieFilters } from "@/components/filters/movie/movie-filters";
import { TvFilters } from "@/components/filters/tv/tv-filters";

import { ContentTypeSelector } from "@/components/home/content-type-selector";
import { AppButton } from "@/components/ui/button";

import {
  fadeUp,
  springTransition,
} from "@/lib/animations";

import { ContentType } from "@/services/tmdb/types";

import { Genre } from "@/types/movie";

type Props = {
  contentType: ContentType;
  setContentType: (value: ContentType) => void;

  genres: Genre[];

  minRating: number;
  setMinRating: (value: number) => void;

  selectedGenre: number | null;
  setSelectedGenre: (value: number | null) => void;

  selectedProvider: number | null;
  setSelectedProvider: (value: number | null) => void;

  selectedRuntime: string;
  setSelectedRuntime: (value: string) => void;

  selectedYear: string;
  setSelectedYear: (value: string) => void;

  onPick: () => void;

  selectedAnimeGenre: string | null;
  setSelectedAnimeGenre: (value: string | null) => void;
};

export function FiltersSection({
  contentType,
  setContentType,
  genres,
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
  onPick,
}: Props) {
  const sharedFilterProps = {
    genres,
    minRating,
    setMinRating,
    selectedGenre,
    setSelectedGenre,
    selectedProvider,
    setSelectedProvider,
    selectedRuntime,
    setSelectedRuntime,
    selectedYear,
    setSelectedYear,
    selectedAnimeGenre,
    setSelectedAnimeGenre,
  };

  return (
    <motion.section
      id="filters"
      variants={fadeUp}
      transition={springTransition}
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

      {contentType === "movie" && (
        <MovieFilters {...sharedFilterProps} />
      )}

      {contentType === "tv" && (
        <TvFilters {...sharedFilterProps} />
      )}

      {contentType === "anime" && (
        <AnimeFilters {...sharedFilterProps} />
      )}

      <div className="mt-8 flex justify-center">
        <AppButton
          onClick={onPick}
          className="w-full max-w-xs"
        >
          🎲 Escolher
        </AppButton>
      </div>
    </motion.section>
  );
}