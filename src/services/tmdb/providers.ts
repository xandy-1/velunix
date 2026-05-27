import { MovieWatchProvidersResult } from "@/types/movie";

import { tmdbFetch } from "./client";

type WatchProvidersResponse = {
  results: {
    BR?: MovieWatchProvidersResult;
  };
};

export async function getMovieWatchProviders(
  movieId: number
): Promise<MovieWatchProvidersResult | null> {
  if (!movieId) {
    throw new Error(
      "Movie ID is required"
    );
  }

  const data =
    await tmdbFetch<WatchProvidersResponse>(
      `/movie/${movieId}/watch/providers`
    );

  return data.results.BR || null;
}