import { supabase } from "@/lib/supabase";

async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user?.id || null;
}

export async function isWatchedMovieRemote(
  movieId: number
): Promise<boolean> {
  const userId =
    await getCurrentUserId();

  if (!userId) {
    return false;
  }

  const { data, error } =
    await supabase
      .from("watched_movies")
      .select("id")
      .eq("user_id", userId)
      .eq("movie_id", movieId)
      .maybeSingle();

  if (error) {
    throw error;
  }

  return !!data;
}

export async function addWatchedMovieRemote(
  movieId: number
) {
  const userId =
    await getCurrentUserId();

  if (!userId) {
    throw new Error(
      "User not authenticated"
    );
  }

  const { error } =
    await supabase
      .from("watched_movies")
      .insert({
        user_id: userId,
        movie_id: movieId,
      });

  if (
    error &&
    error.code !== "23505"
  ) {
    throw error;
  }
}

export async function removeWatchedMovieRemote(
  movieId: number
) {
  const userId =
    await getCurrentUserId();

  if (!userId) {
    throw new Error(
      "User not authenticated"
    );
  }

  const { error } =
    await supabase
      .from("watched_movies")
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId);

  if (error) {
    throw error;
  }
}

export async function toggleWatchedMovieRemote(
  movieId: number
): Promise<boolean> {
  const isWatched =
    await isWatchedMovieRemote(
      movieId
    );

  if (isWatched) {
    await removeWatchedMovieRemote(
      movieId
    );

    return false;
  }

  await addWatchedMovieRemote(
    movieId
  );

  return true;
}