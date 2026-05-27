/**
 * =========================================================
 * TMDB SERVICES EXPORTS
 * =========================================================
 *
 * Centraliza todos os exports
 * relacionados à TMDB.
 *
 * Benefícios:
 * - imports limpos
 * - desacoplamento
 * - manutenção facilitada
 */

export { discoverMovies } from "./discover";

export { getGenres } from "./genres";

export { getMovieDetails } from "./details";

export { getMovieTrailer } from "./trailers";

export { getMovieWatchProviders } from "./providers";

export { getMovieById } from "./movie";