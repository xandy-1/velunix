const WATCHED_KEY =
  "velunix_watched_movies";

export function getWatchedMovieIds(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw =
    localStorage.getItem(
      WATCHED_KEY
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

export function isWatchedMovie(
  movieId: number
): boolean {
  return getWatchedMovieIds().includes(
    movieId
  );
}

export function addWatchedMovie(
  movieId: number
) {
  if (typeof window === "undefined") {
    return;
  }

  const watched =
    getWatchedMovieIds();

  const updated = Array.from(
    new Set([
      ...watched,
      movieId,
    ])
  );

  localStorage.setItem(
    WATCHED_KEY,
    JSON.stringify(updated)
  );
}

export function removeWatchedMovie(
  movieId: number
) {
  if (typeof window === "undefined") {
    return;
  }

  const updated =
    getWatchedMovieIds().filter(
      (id) => id !== movieId
    );

  localStorage.setItem(
    WATCHED_KEY,
    JSON.stringify(updated)
  );
}

export function toggleWatchedMovie(
  movieId: number
) {
  if (
    isWatchedMovie(movieId)
  ) {
    removeWatchedMovie(movieId);

    return false;
  }

  addWatchedMovie(movieId);

  return true;
}