import { Movie } from "@/types/movie";

export function isValidMovie(
  movie: Movie
): boolean {
  if (!movie.id) {
    return false;
  }

  if (!movie.title?.trim()) {
    return false;
  }

  if (!movie.overview?.trim()) {
    return false;
  }

  if (!movie.poster_path) {
    return false;
  }

  if (
    !movie.vote_average ||
    movie.vote_average <= 0
  ) {
    return false;
  }

  return true;
}