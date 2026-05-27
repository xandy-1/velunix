export type Genre = {
  id: number;
  name: string;
};

export type Provider = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  release_date?: string;
  genre_ids?: number[];
};

export type MovieDetails = {
  id: number;
  runtime: number;
  ageRating?: string;
};

export type MovieTrailer = {
  key: string;
  name: string;
  site: string;
  type: string;
};

export type MovieWatchProvider = {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
};

export type MovieWatchProvidersResult = {
  link: string;
  flatrate?: MovieWatchProvider[];
  rent?: MovieWatchProvider[];
  buy?: MovieWatchProvider[];
};