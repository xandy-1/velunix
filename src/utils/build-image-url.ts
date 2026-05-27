const TMDB_IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p";

export function buildImageUrl(
  path: string | null,
  size = "w500"
): string {
  if (!path) {
    return "/placeholder-poster.png";
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}