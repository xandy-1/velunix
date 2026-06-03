"use client";

import { useEffect, useState } from "react";

import { Navbar } from "@/components/layout/navbar";
import { ProfileSkeleton } from "@/components/profile/profile-skeleton";

import { supabase } from "@/lib/supabase";

import { signOut } from "@/services/auth";

const FEEDBACK_URL = "https://tally.so/r/javVBa";

type UserProfile = {
  email?: string;
  created_at?: string;
};

export default function ProfilePage() {
  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [favoritesCount, setFavoritesCount] =
    useState(0);

  const [watchedCount, setWatchedCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          return;
        }

        setUser({
          email: user.email,
          created_at: user.created_at,
        });

        const [
          { count: favorites },
          { count: watched },
        ] = await Promise.all([
          supabase
            .from("favorites")
            .select("*", {
              count: "exact",
              head: true,
            })
            .eq("user_id", user.id),

          supabase
            .from("watched_movies")
            .select("*", {
              count: "exact",
              head: true,
            })
            .eq("user_id", user.id),
        ]);

        setFavoritesCount(favorites || 0);
        setWatchedCount(watched || 0);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSignOut() {
    try {
      await signOut();

      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao sair:", error);

      alert("Erro ao sair.");
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-28 pt-32 text-white md:pb-20">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
              <div className="mb-8">
                <h1 className="text-4xl font-black">
                  Seu perfil 👤
                </h1>

                <p className="mt-3 text-zinc-400">
                  Carregando informações da conta...
                </p>
              </div>

              <ProfileSkeleton />
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-28 pt-32 text-white md:pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
            <div className="mb-8">
              <h1 className="text-4xl font-black">
                Seu perfil 👤
              </h1>

              <p className="mt-3 text-zinc-400">
                Informações da sua conta Velunix.
              </p>
            </div>

            {!user ? (
              <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-zinc-900/50 p-10 text-center">
                <div className="mb-4 text-5xl">
                  👤
                </div>

                <h2 className="text-2xl font-bold text-white">
                  Você ainda não entrou
                </h2>

                <p className="mt-3 max-w-md text-zinc-400">
                  Entre para salvar favoritos, marcar filmes assistidos e desbloquear sorteios ilimitados.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    (window.location.href = "/")
                  }
                  className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
                >
                  Entrar agora
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
                  <p className="mb-2 text-sm text-zinc-500">
                    Email
                  </p>

                  <p className="text-lg font-medium">
                    {user.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
                  <p className="mb-2 text-sm text-zinc-500">
                    Conta criada em
                  </p>

                  <p className="text-lg font-medium">
                    {user.created_at
                      ? new Date(
                          user.created_at
                        ).toLocaleDateString(
                          "pt-BR"
                        )
                      : "Desconhecido"}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
                    <p className="mb-2 text-sm text-zinc-500">
                      Favoritos
                    </p>

                    <p className="text-3xl font-black">
                      {favoritesCount}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
                    <p className="mb-2 text-sm text-zinc-500">
                      Já assistidos
                    </p>

                    <p className="text-3xl font-black">
                      {watchedCount}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        💡 Enviar sugestão
                      </h2>

                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        Ajude a melhorar o Velunix. Compartilhe ideias, relate problemas ou sugira novas funcionalidades.
                      </p>
                    </div>

                    <a
                      href={FEEDBACK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:scale-105 hover:bg-zinc-200"
                    >
                      Enviar feedback
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 font-semibold text-red-400 transition hover:bg-red-500/20"
                >
                  Sair da conta
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}