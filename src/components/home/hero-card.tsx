import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { MovieWatchProvidersResult } from "@/types/movie";

import { buildImageUrl } from "@/utils/build-image-url";
import { formatRuntime } from "@/utils/format-runtime";

type HeroMovie = {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  genreLabel: string;
  ageRating: string;
};

type Props = {
  heroMovie: HeroMovie;
  heroMovies: HeroMovie[];
  heroDuration: number;
  heroProviders: MovieWatchProvidersResult | null;
  onPick: () => void;
};

export function HeroCard({
  heroMovie,
  heroMovies,
  heroDuration,
  heroProviders,
  onPick,
}: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={heroMovie.id}
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: -20,
          scale: 0.97,
        }}
        transition={{
          duration: 0.4,
        }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="absolute -inset-8 rounded-full bg-red-600/20 blur-3xl" />

        <div className="relative rotate-2 rounded-[2rem] border border-red-500/30 bg-zinc-950 p-4 shadow-2xl shadow-red-950/40 transition hover:rotate-0">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
            <div className="relative flex aspect-[3/4] items-end overflow-hidden p-5">
              <img
                src={buildImageUrl(
                  heroMovie.posterPath,
                  "w780"
                )}
                alt={`Pôster de ${heroMovie.title}`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />

              <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-sm font-bold backdrop-blur">
                ⭐ {heroMovie.rating}
              </div>

              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-400">
                  Recomendação
                </p>

                <h2 className="mt-2 text-4xl font-black uppercase">
                  {heroMovie.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-300">
                  <span>
                    ⏱{" "}
                    {formatRuntime(
                      heroDuration
                    )}
                  </span>

                  <span>
                    🎬 {heroMovie.genreLabel}
                  </span>

                  <span>
                    {heroMovie.ageRating}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <p className="text-sm text-zinc-500">
                  Disponível em:
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {heroProviders?.flatrate
                    ?.slice(0, 3)
                    .map((provider) => (
                      <span
                        key={
                          provider.provider_id
                        }
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200"
                      >
                        {
                          provider.provider_name
                        }
                      </span>
                    ))}

                  {!heroProviders?.flatrate
                    ?.length && (
                    <>
                      <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200">
                        Netflix
                      </span>

                      <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200">
                        Prime Video
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold transition hover:bg-red-500">
                  ▶ Trailer
                </button>

                <button
                  type="button"
                  onClick={onPick}
                  className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
                >
                  🎲 Outro
                </button>
              </div>

              <button className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-zinc-200">
                📺 Ver onde assistir
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {heroMovies.map((item) => (
            <div
              key={item.id}
              className={`h-2 rounded-full transition-all ${
                item.id === heroMovie.id
                  ? "w-8 bg-red-500"
                  : "w-2 bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}