import { Movie } from "@/types/movie";

export function getMovieScore(
  movie: Movie
): number {
  const ratingScore =
    movie.vote_average * 10;

  const voteScore =
    Math.min(
      (movie.vote_count || 0) / 100,
      30
    );

  const popularityScore =
    Math.min(
      (movie.popularity || 0) / 10,
      20
    );

  return (
    ratingScore +
    voteScore +
    popularityScore
  );
}

export function sortMoviesByScore(
  movies: Movie[]
): Movie[] {
  return [...movies].sort(
    (a, b) =>
      getMovieScore(b) -
      getMovieScore(a)
  );
}