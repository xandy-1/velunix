import { Movie } from "@/types/movie";

import { tmdbFetch } from "./client";

export async function getMovieById(
  movieId: number
): Promise<Movie> {
  if (!movieId) {
    throw new Error(
      "Movie ID is required"
    );
  }

  return tmdbFetch<Movie>(
    `/movie/${movieId}?language=pt-BR`
  );
}