const CACHE_KEY =
  "velunix_seen_movies";

function safeParseMovieIds(
  raw: string | null
): number[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (id) =>
        typeof id === "number"
    );
  } catch {
    localStorage.removeItem(
      CACHE_KEY
    );

    return [];
  }
}

export function getSeenMovieIds(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw =
    localStorage.getItem(
      CACHE_KEY
    );

  return safeParseMovieIds(raw);
}

export function addSeenMovieId(
  movieId: number
) {
  if (typeof window === "undefined") {
    return;
  }

  const currentIds =
    getSeenMovieIds();

  const updatedIds = Array.from(
    new Set([
      ...currentIds,
      movieId,
    ])
  ).slice(-100);

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify(updatedIds)
  );
}

export function filterUnseenMovies<
  T extends { id: number },
>(movies: T[]): T[] {
  const seenIds =
    getSeenMovieIds();

  return movies.filter(
    (movie) =>
      !seenIds.includes(movie.id)
  );
}

export function clearSeenMovies() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    CACHE_KEY
  );
}