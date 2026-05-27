import {
  Genre,
  Movie,
  MovieDetails,
  MovieTrailer,
} from "@/types/movie";

export type DiscoverMoviesParams = {
  minRating: number;
  genreId?: number | null;
  providerId?: number | null;
  minRuntime?: number | null;
  maxRuntime?: number | null;
  minYear?: number | null;
  maxYear?: number | null;
};

export type DiscoverMoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type GenresResponse = {
  genres: Genre[];
};

export type MovieDetailsResponse =
  MovieDetails;

export type MovieVideosResponse = {
  results: MovieTrailer[];
};