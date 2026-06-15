"use client";

import { usePostHog } from "posthog-js/react";

import {
  Suspense,
  useEffect,
  useState,
  useRef,
} from "react";

import type { FormEvent } from "react";

import Image from "next/image";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Navbar } from "@/components/layout/navbar";

import {
  searchContent,
  SearchContentType,
  SearchResult,
} from "@/services/tmdb/search";

import { Movie } from "@/types/movie";

import { buildImageUrl } from "@/utils/build-image-url";
import { isValidMovie } from "@/utils/is-valid-movie";


function SearchContent() {

  const [contentType, setContentType] =
  useState<SearchContentType>("all");

  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery =
    searchParams.get("q") || "";

  const [query, setQuery] =
    useState(initialQuery);

  const [movies, setMovies] =
    useState<SearchResult[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const searchRef =
    useRef<HTMLDivElement>(null);

  const posthog = usePostHog();

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const value = query.trim();

      if (!value) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);

        const results = await searchContent(
          value,
          contentType
        );

        setMovies(results);
      } catch (error) {
        console.error(
          "Erro ao pesquisar títulos:",
          error
        );
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, contentType]);

  useEffect(() => {
      function handleClick(
        event: MouseEvent
      ) {
        if (
          searchRef.current &&
          !searchRef.current.contains(
            event.target as Node
          )
        ) {
          setShowSuggestions(false);
        }
      }

      document.addEventListener(
        "mousedown",
        handleClick
      );

      return () =>
        document.removeEventListener(
          "mousedown",
          handleClick
        );
    }, []);

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    posthog.capture("search_performed", {
      query: trimmedQuery,
      content_type: contentType,
    });

    router.replace(
      `/search?q=${encodeURIComponent(
        trimmedQuery
      )}&type=${contentType}`
    );
  }

 function openMovie(movie: SearchResult) {
    posthog.capture("search_result_clicked", {
      movie_id: movie.id,
      movie_title: movie.title,
      content_type: movie.content_type,
      query,
    });

    router.push(
      `/pick?movieId=${movie.id}&type=${movie.content_type}`
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-44 pt-32 text-white md:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-red-500">
              Pesquisa
            </p>

            <h1 className="mt-3 text-4xl font-black md:text-6xl">
              Procure um filme
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Já sabe o que quer assistir? Pesquise pelo título e abra direto o resultado.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[
                ["all", "✨ Todos"],
                ["movie", "🎬 Filmes"],
                ["tv", "📺 Séries"],
                ["anime", "🌸 Animes"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setContentType(
                      value as SearchContentType
                    )
                  }
                  className={
                    contentType === value
                      ? "rounded-xl border border-red-500 bg-red-500/15 px-4 py-2 text-sm font-bold"
                      : "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm"
                  }
                >
                  {label}
                </button>
              ))}
            </div>

          </div>

        <div 
          ref={searchRef}
          className="relative z-50 mx-auto max-w-2xl"
          >
          <form
              onSubmit={handleSubmit}
              className="relative mx-auto flex max-w-2xl flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur sm:flex-row"
            >
           <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() =>
                setShowSuggestions(true)
              }
              placeholder="Ex: Interstellar, Breaking Bad, Naruto..."
              className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-zinc-950 px-5 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
            />

            <button
              type="submit"
              className="rounded-2xl bg-red-600 px-6 py-4 font-bold text-white transition hover:bg-red-500"
            >
              🔎 Pesquisar
            </button>

            {showSuggestions &&
              query.trim().length >= 2 &&
              movies.length > 0 && (
                <div className="absolute left-0 right-0 top-[105%] z-[999] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
                  {movies
                    .slice(0, 6)
                    .map((movie) => (
                      <button
                        key={movie.id}
                        type="button"
                        onClick={() =>
                          openMovie(movie)
                        }
                        className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5"
                      >
                        <span className="text-zinc-500">
                          🔎
                        </span>

                        <div>
                          <p className="font-medium text-white">
                            {movie.title}
                          </p>

                          <p className="text-xs text-zinc-500">
                            {movie.content_type ===
                            "movie"
                              ? "Filme"
                              : movie.content_type ===
                                  "tv"
                                ? "Série"
                                : "Anime"}
                          </p>
                        </div>
                      </button>
                    ))}
                </div>
            )}
          </form>
        </div>
          {loading && (
            <p className="mt-10 text-center text-zinc-400">
              Buscando filmes...
            </p>
          )}

          {!loading &&
            initialQuery &&
            movies.length === 0 && (
              <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-white/10 bg-zinc-900/50 p-8 text-center">
                <div className="text-5xl">
                  🎬
                </div>

                <h2 className="mt-4 text-2xl font-bold">
                  Nenhum filme encontrado
                </h2>

                <p className="mt-3 text-zinc-400">
                  Tente pesquisar outro título ou usar menos palavras.
                </p>
              </div>
            )}

          {movies.length > 0 && (
            <div className="relative z-0 mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {movies.map((movie) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() =>
                    openMovie(movie)
                    }
                    
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 text-left transition hover:scale-[1.02] hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/10"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden">
                    <Image
                      src={buildImageUrl(
                        movie.poster_path
                      )}
                      alt={movie.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      ⭐{" "}
                      {movie.vote_average.toFixed(
                        1
                      )}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="line-clamp-2 text-sm font-bold text-white md:text-base">
                        {movie.title}
                      </h3>

                      <p className="mt-2 text-xs text-zinc-300">
                        Abrir resultado
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          Carregando...
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}