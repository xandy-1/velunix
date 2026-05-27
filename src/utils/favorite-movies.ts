const FAVORITES_KEY =
  "velunix_favorite_movies";

export function getFavoriteMovieIds(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw =
    localStorage.getItem(
      FAVORITES_KEY
    );

  if (!raw) {
    return [];
  }

  try {
    const parsed =
      JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (id) =>
        typeof id === "number"
    );
  } catch {
    return [];
  }
}

export function isFavoriteMovie(
  movieId: number
): boolean {
  return getFavoriteMovieIds().includes(
    movieId
  );
}

export function addFavoriteMovie(
  movieId: number
) {
  if (typeof window === "undefined") {
    return;
  }

  const favorites =
    getFavoriteMovieIds();

  const updated = Array.from(
    new Set([
      ...favorites,
      movieId,
    ])
  );

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updated)
  );
}

export function removeFavoriteMovie(
  movieId: number
) {
  if (typeof window === "undefined") {
    return;
  }

  const updated =
    getFavoriteMovieIds().filter(
      (id) => id !== movieId
    );

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updated)
  );
}

export function toggleFavoriteMovie(
  movieId: number
) {
  if (
    isFavoriteMovie(movieId)
  ) {
    removeFavoriteMovie(movieId);

    return false;
  }

  addFavoriteMovie(movieId);

  return true;
}