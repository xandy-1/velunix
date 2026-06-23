import {
  GenreFilter,
  ProviderFilter,
  RatingFilter,
  RuntimeFilter,
  YearFilter,
} from "@/components/filters";

import { STREAMING_OPTIONS } from "@/constants/providers";

export function MovieFilters(props: any) {
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

      <RuntimeFilter
        selectedRuntime={props.selectedRuntime}
        setSelectedRuntime={props.setSelectedRuntime}
      />

      <YearFilter
        selectedYear={props.selectedYear}
        setSelectedYear={props.setSelectedYear}
      />
    </div>
  );
}