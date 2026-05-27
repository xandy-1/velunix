"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { LoginPrompt } from "@/components/layout/login-prompt";

import { supabase } from "@/lib/supabase";

type UserData = {
  email?: string;
};

export function Navbar() {
  const pathname = usePathname();

  const [user, setUser] =
    useState<UserData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [loginOpen, setLoginOpen] =
    useState(false);

  function isActive(path: string) {
    return pathname === path;
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUser({
            email: user.email,
          });
        }
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    setUser(null);

    window.location.href = "/";
  }

  return (
    <>
      {/* Desktop navbar */}
      <header className="fixed left-0 top-0 z-40 hidden w-full border-b border-white/10 bg-black/60 backdrop-blur-xl md:block">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            Velunix
          </Link>

          <div className="flex items-center gap-5">
            <Link
              href="/favorites"
              className={`text-sm transition ${
                isActive("/favorites")
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Favoritos
            </Link>

            <Link
              href="/watched"
              className={`text-sm transition ${
                isActive("/watched")
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Já assisti
            </Link>

            {!loading && !user && (
              <button
                type="button"
                onClick={() =>
                  setLoginOpen(true)
                }
                className="rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-105"
              >
                Entrar
              </button>
            )}

            {!loading && user && (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    isActive("/profile")
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:text-white"
                  }`}
                >
                  {user.email}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-300 transition hover:bg-red-500/20"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile top logo */}
      <header className="fixed left-0 top-0 z-40 w-full border-b border-white/10 bg-black/60 px-6 py-4 backdrop-blur-xl md:hidden">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-white"
        >
          Velunix
        </Link>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 text-center text-xs">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 transition ${
              isActive("/")
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="text-lg">
              🏠
            </span>

            Home
          </Link>

          <Link
            href="/favorites"
            className={`flex flex-col items-center gap-1 transition ${
              isActive("/favorites")
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="text-lg">
              ❤️
            </span>

            Favoritos
          </Link>

          <Link
            href="/watched"
            className={`flex flex-col items-center gap-1 transition ${
              isActive("/watched")
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="text-lg">
              👁️
            </span>

            Assistidos
          </Link>

          {user ? (
            <Link
              href="/profile"
              className={`flex flex-col items-center gap-1 transition ${
                isActive("/profile")
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="text-lg">
                👤
              </span>

              Perfil
            </Link>
          ) : (
            <button
              type="button"
              onClick={() =>
                setLoginOpen(true)
              }
              className="flex flex-col items-center gap-1 text-zinc-400 transition hover:text-white"
            >
              <span className="text-lg">
                🔐
              </span>

              Entrar
            </button>
          )}
        </div>
      </nav>

      <LoginPrompt
        open={loginOpen}
        onClose={() =>
          setLoginOpen(false)
        }
      />
    </>
  );
}