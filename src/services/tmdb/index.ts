/**
 * =========================================================
 * TMDB SERVICES EXPORTS
 * =========================================================
 */

export { discoverMovies } from "./discover";

export {getGenres, getGenresByType, } from "./genres";

export { getContentDetails } from "./details";

export { getContentTrailer } from "./trailers";

export { getContentWatchProviders } from "./providers";

export { getMovieById } from "./movie";

export { getContentById } from "./content";

export { searchContent } from "./search";

export type {
  SearchContentType,
  SearchResult,
} from "./search";