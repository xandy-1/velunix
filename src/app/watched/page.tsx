"use client";

import { useEffect, useState } from "react";

import { Navbar } from "@/components/layout/navbar";
import { MiniMovieCard } from "@/components/movie/mini-movie-card";
import { MovieGridSkeleton } from "@/components/movie/movie-grid-skeleton";

import { supabase } from "@/lib/supabase";

import { getMovieById } from "@/services/tmdb";

import { Movie } from "@/types/movie";

export default function WatchedPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWatched() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          return;
        }

        const { data, error } = await supabase
          .from("watched_movies")
          .select("movie_id")
          .eq("user_id", user.id);

        if (error) {
          throw error;
        }

        const moviesData = await Promise.all(
          data.map((item) =>
            getMovieById(item.movie_id)
          )
        );

        setMovies(moviesData);
      } catch (error) {
        console.error("Erro ao carregar assistidos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadWatched();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-28 pt-32 text-white md:pb-20">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-4xl font-black">
              Já assisti 👁️
            </h1>

            <p className="mt-3 text-zinc-400">
              Carregando seus filmes assistidos...
            </p>

            <MovieGridSkeleton />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-28 pt-32 text-white md:pb-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-black">
            Já assisti 👁️
          </h1>

          <p className="mt-3 text-zinc-400">
            Filmes que você marcou como assistidos.
          </p>

          {movies.length === 0 ? (
            <div className="mt-12 flex flex-col items-center rounded-3xl border border-white/10 bg-zinc-900/50 p-10 text-center">
              <div className="mb-4 text-5xl">
                👁️
              </div>

              <h2 className="text-2xl font-bold text-white">
                Nenhum filme assistido ainda
              </h2>

              <p className="mt-3 max-w-md text-zinc-400">
                Marque filmes como assistidos para o Velunix entender melhor seu gosto.
              </p>

              <button
                type="button"
                onClick={() =>
                  (window.location.href = "/")
                }
                className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
              >
                Encontrar filme
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {movies.map((movie) => (
                <MiniMovieCard
                  key={movie.id}
                  movieId={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}