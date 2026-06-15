"use client";

import { motion } from "framer-motion";
import { usePostHog } from "posthog-js/react";

import { AppButton } from "@/components/ui/button";

import {
  cardAnimation,
  springTransition,
} from "@/lib/animations";

import { MovieWatchProvidersResult } from "@/types/movie";

import { buildImageUrl } from "@/utils/build-image-url";
import { formatRuntime } from "@/utils/format-runtime";

type MovieCardProps = {
  movieId: number;
  title: string;
  description: string;
  rating: number;
  duration: number;
  ageRating?: string;
  posterPath: string | null;
  trailerUrl?: string;
  watchProviders?: MovieWatchProvidersResult | null;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  isWatched?: boolean;
  onToggleWatched?: () => void;
  onReroll?: () => void;
};

export function MovieCard({
  movieId,
  title,
  description,
  rating,
  duration,
  ageRating,
  posterPath,
  trailerUrl,
  watchProviders,
  isFavorite,
  onToggleFavorite,
  isWatched,
  onToggleWatched,
  onReroll,
}: MovieCardProps) {
  const posthog = usePostHog();

  function trackTrailerOpened() {
    posthog.capture("trailer_opened", {
      movie_id: movieId,
      movie_title: title,
      rating,
    });
  }

  function trackWatchProviderClicked() {
    posthog.capture("watch_provider_clicked", {
      movie_id: movieId,
      movie_title: title,
      rating,
      available_providers:
        watchProviders?.flatrate?.map(
          (provider) =>
            provider.provider_name
        ) || [],
    });
  }

  return (
    <motion.article
      key={title}
      variants={cardAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={springTransition}
      className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl"
    >
      <div className="overflow-hidden">
        <img
          src={buildImageUrl(posterPath)}
          alt={`Pôster do filme ${title}`}
          className="h-[500px] w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div>
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-400">
            <span>⭐ {rating.toFixed(1)}</span>
            <span>⏱️ {formatRuntime(duration)}</span>
            <span>🔞 {ageRating || "Livre"}</span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-300">
          {description || "Sem descrição disponível."}
        </p>

        {watchProviders?.flatrate &&
          watchProviders.flatrate.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-zinc-400">
                Disponível em:
              </span>

              <div className="flex flex-wrap gap-2">
                {watchProviders.flatrate.map((provider) => (
                  <div
                    key={provider.provider_id}
                    className="flex items-center gap-2 rounded-xl bg-zinc-800 px-3 py-2"
                  >
                    <img
                      src={buildImageUrl(
                        provider.logo_path,
                        "w92"
                      )}
                      alt={provider.provider_name}
                      className="h-5 w-5 rounded-full"
                    />

                    <span className="text-sm text-white">
                      {provider.provider_name}
                    </span>
                  </div>
                ))}
              </div>

              <AppButton
                href={watchProviders.link}
                variant="secondary"
                className="w-full text-center"
                onClick={trackWatchProviderClicked}
              >
                📺 Ver onde assistir
              </AppButton>
            </div>
          )}

        <div className="flex flex-col gap-3 pt-2">
          <div className="flex gap-3">
            {trailerUrl && (
              <AppButton
                href={trailerUrl}
                variant="danger"
                className="flex-1 text-center"
                onClick={trackTrailerOpened}
              >
                🎬 Trailer
              </AppButton>
            )}

            {onReroll && (
              <AppButton
                onClick={onReroll}
                variant="primary"
                className="flex-1"
              >
                🎲 Outro
              </AppButton>
            )}
          </div>

          {onToggleFavorite && (
            <AppButton
              onClick={onToggleFavorite}
              variant="secondary"
              className="w-full"
            >
              {isFavorite
                ? "❤️ Favoritado"
                : "🤍 Favoritar"}
            </AppButton>
          )}

          {onToggleWatched && (
            <AppButton
              onClick={onToggleWatched}
              variant="secondary"
              className="w-full"
            >
              {isWatched
                ? "✅ Já assistido"
                : "👁️ Já assisti"}
            </AppButton>
          )}
        </div>
      </div>
    </motion.article>
  );
}