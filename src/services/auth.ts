import { supabase } from "@/lib/supabase";

export async function signInWithGoogle() {
  const { error } =
    await supabase.auth.signInWithOAuth({
      provider: "google",

      options: {
        redirectTo:
          `${window.location.origin}/auth/callback`,
      },
    });

  if (error) {
    throw error;
  }
}

export async function signInWithEmail(
  email: string
) {
  const { error } =
    await supabase.auth.signInWithOtp({
      email,

      options: {
        emailRedirectTo:
          `${window.location.origin}/auth/callback`,
      },
    });

  if (error) {
    throw error;
  }
}

export async function signOut() {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getSession() {
  const { data, error } =
    await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}