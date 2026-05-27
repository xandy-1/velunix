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

export async function isFavoriteMovieRemote(
  movieId: number
): Promise<boolean> {
  const userId =
    await getCurrentUserId();

  if (!userId) {
    return false;
  }

  const { data, error } =
    await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("movie_id", movieId)
      .maybeSingle();

  if (error) {
    throw error;
  }

  return !!data;
}

export async function addFavoriteMovieRemote(
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
      .from("favorites")
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

export async function removeFavoriteMovieRemote(
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
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId);

  if (error) {
    throw error;
  }
}

export async function toggleFavoriteMovieRemote(
  movieId: number
): Promise<boolean> {
  const isFavorite =
    await isFavoriteMovieRemote(
      movieId
    );

  if (isFavorite) {
    await removeFavoriteMovieRemote(
      movieId
    );

    return false;
  }

  await addFavoriteMovieRemote(
    movieId
  );

  return true;
}