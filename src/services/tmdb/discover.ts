import { Movie } from "@/types/movie";

import { tmdbFetch } from "./client";

import {
  DiscoverMoviesParams,
  DiscoverMoviesResponse,
} from "./types";

const DISCOVER_PAGES_TO_FETCH = 15;

export async function discoverMovies(
  params: DiscoverMoviesParams
): Promise<Movie[]> {
  const {
    contentType = "movie",
    minRating,
    genreId,
    providerId,
    minRuntime,
    maxRuntime,
    minYear,
    maxYear,
  } = params;

  const tmdbType =
    contentType === "tv" ||
    contentType === "anime"
      ? "tv"
      : "movie";

  const minimumVoteCount =
    providerId ? 0 : 80;

  let endpoint =
    `/discover/${tmdbType}?language=pt-BR&sort_by=popularity.desc&vote_count.gte=${minimumVoteCount}&vote_average.gte=${minRating}`;

  if (genreId) {
    endpoint += `&with_genres=${genreId}`;
  }

  if (providerId) {
    endpoint +=
      `&with_watch_providers=${providerId}&watch_region=BR`;
  }

  if (contentType === "anime") {
    endpoint +=
      "&with_original_language=ja";

    endpoint +=
      "&with_genres=16";
  }

  if (
    contentType === "movie" &&
    minRuntime
  ) {
    endpoint +=
      `&with_runtime.gte=${minRuntime}`;
  }

  if (
    contentType === "movie" &&
    maxRuntime
  ) {
    endpoint +=
      `&with_runtime.lte=${maxRuntime}`;
  }

  if (minYear) {
    const dateField =
      tmdbType === "tv"
        ? "first_air_date"
        : "primary_release_date";

    endpoint +=
      `&${dateField}.gte=${minYear}-01-01`;
  }

  if (maxYear) {
    const dateField =
      tmdbType === "tv"
        ? "first_air_date"
        : "primary_release_date";

    endpoint +=
      `&${dateField}.lte=${maxYear}-12-31`;
  }

  const pages = Array.from(
    {
      length:
        DISCOVER_PAGES_TO_FETCH,
    },
    (_, index) => index + 1
  );

  const responses =
    await Promise.all(
      pages.map((page) =>
        tmdbFetch<DiscoverMoviesResponse>(
          `${endpoint}&page=${page}`
        )
      )
    );

  const movies =
    responses.flatMap(
      (response) =>
        response.results
    );

  return Array.from(
    new Map(
      movies.map((movie) => [
        movie.id,
        movie,
      ])
    ).values()
  );
}