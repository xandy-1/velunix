import { Movie } from "@/types/movie";

const CURRENT_MOVIE_KEY =
  "velunix_current_movie";

export function saveCurrentMovie(
  movie: Movie
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    CURRENT_MOVIE_KEY,
    JSON.stringify(movie)
  );
}

export function getCurrentMovie():
  | Movie
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw =
    localStorage.getItem(
      CURRENT_MOVIE_KEY
    );

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);

    if (
      !parsed ||
      typeof parsed.id !== "number" ||
      !parsed.title
    ) {
      clearCurrentMovie();

      return null;
    }

    return parsed;
  } catch {
    clearCurrentMovie();

    return null;
  }
}

export function clearCurrentMovie() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    CURRENT_MOVIE_KEY
  );
}