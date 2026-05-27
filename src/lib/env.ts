/**
 * Centraliza as variáveis de ambiente do projeto.
 */

export const env = {
  TMDB_API_KEY:
    process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "",
};