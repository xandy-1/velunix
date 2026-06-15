import {
  Genre,
  Movie,
  MovieDetails,
  MovieTrailer,
} from "@/types/movie";

export type ContentType =
  | "movie"
  | "tv"
  | "anime";

  export function getTmdbContentType(
    type: ContentType
  ) {
    return type === "movie"
      ? "movie"
      : "tv";
  }
  
export type DiscoverMoviesParams = {
  contentType?: ContentType;
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

