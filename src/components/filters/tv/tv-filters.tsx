import {
  GenreFilter,
  ProviderFilter,
  RatingFilter,
  YearFilter,
} from "@/components/filters";

import { STREAMING_OPTIONS } from "@/constants/providers";

export function TvFilters(props: any) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <RatingFilter
        minRating={props.minRating}
        setMinRating={props.setMinRating}
      />

      <GenreFilter
        genres={props.genres}
        selectedGenre={props.selectedGenre}
        setSelectedGenre={props.setSelectedGenre}
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