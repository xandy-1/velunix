"use client";

import Image from "next/image";
import Link from "next/link";

type MiniMovieCardProps = {
  movieId: number;
  title: string;
  posterPath: string | null;
  rating: number;
};

export function MiniMovieCard({
  movieId,
  title,
  posterPath,
  rating,
}: MiniMovieCardProps) {
  return (
    <Link
      href={`/pick?movieId=${movieId}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition duration-300 hover:scale-[1.02] hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/10 active:scale-[0.98]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {posterPath ? (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-800 text-sm text-zinc-500">
            Sem imagem
          </div>
        )}

        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          ⭐ {rating.toFixed(1)}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-white drop-shadow-lg md:text-base">
          {title}
        </h3>

        <p className="mt-2 text-xs text-zinc-300">
          Toque para abrir
        </p>
      </div>
    </Link>
  );
}