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
    minRating,
    genreId,
    providerId,
    minRuntime,
    maxRuntime,
    minYear,
    maxYear,
  } = params;

  const minimumVoteCount =
    providerId ? 0 : 80;

  let endpoint =
    `/discover/movie?language=pt-BR&sort_by=popularity.desc&vote_count.gte=${minimumVoteCount}&vote_average.gte=${minRating}`;

  if (genreId) {
    endpoint += `&with_genres=${genreId}`;
  }

  if (providerId) {
    endpoint +=
      `&with_watch_providers=${providerId}&watch_region=BR`;
  }

  if (minRuntime) {
    endpoint +=
      `&with_runtime.gte=${minRuntime}`;
  }

  if (maxRuntime) {
    endpoint +=
      `&with_runtime.lte=${maxRuntime}`;
  }

  if (minYear) {
    endpoint +=
      `&primary_release_date.gte=${minYear}-01-01`;
  }

  if (maxYear) {
    endpoint +=
      `&primary_release_date.lte=${maxYear}-12-31`;
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