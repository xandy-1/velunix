import {
  ProviderFilter,
  RatingFilter,
  YearFilter,
} from "@/components/filters";

import { AnimeGenreFilter } from "@/components/filters/anime/anime-genre-filter";

import { ANIME_GENRES } from "@/constants/anime-genres";
import { STREAMING_OPTIONS } from "@/constants/providers";

export function AnimeFilters(props: any) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <RatingFilter
        minRating={props.minRating}
        setMinRating={props.setMinRating}
      />

      <AnimeGenreFilter
        genres={ANIME_GENRES}
        selectedGenre={props.selectedAnimeGenre}
        setSelectedGenre={props.setSelectedAnimeGenre}
      />

      <ProviderFilter
        providers={STREAMING_OPTIONS}
        selectedProvider={props.selectedProvider}
        setSelectedProvider={props.setSelectedProvider}
      />

      <YearFilter
        selectedYear={props.selectedYear}
        setSelectedYear={props.setSelectedYear}
      />
    </div>
  );
}