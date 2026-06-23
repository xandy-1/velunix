import {
  ReadonlyURLSearchParams,
  useRouter,
} from "next/navigation";

import { useState } from "react";

import { ContentType } from "@/services/tmdb/types";

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

export function useHomeFilters(
  searchParams: ReadonlyURLSearchParams
) {
  const router = useRouter();

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
      ? Number(searchParams.get("genre"))
      : null
  );

  const [
    selectedAnimeGenre,
    setSelectedAnimeGenre,
  ] = useState<string | null>(null);

  const [
    selectedProvider,
    setSelectedProvider,
  ] = useState<number | null>(
    searchParams.get("provider")
      ? Number(
          searchParams.get("provider")
        )
      : null
  );

  const [
    selectedRuntime,
    setSelectedRuntime,
  ] = useState(
    JSON.stringify({
      min: searchParams.get("minRuntime")
        ? Number(
            searchParams.get("minRuntime")
          )
        : null,

      max: searchParams.get("maxRuntime")
        ? Number(
            searchParams.get("maxRuntime")
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
            searchParams.get("minYear")
          )
        : null,

      max: searchParams.get("maxYear")
        ? Number(
            searchParams.get("maxYear")
          )
        : null,
    })
  );

  function buildPickParams() {
    const params =
      new URLSearchParams();

    params.set("type", contentType);

    params.set(
      "rating",
      String(minRating)
    );

    if (
      contentType === "anime" &&
      selectedAnimeGenre
    ) {
      params.set(
        "animeGenre",
        selectedAnimeGenre
      );
    }

    if (
      contentType !== "anime" &&
      selectedGenre
    ) {
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
    const params = buildPickParams();

    router.push(
      `/pick?${params.toString()}`
    );
  }

  return {
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
  };
}