import { MovieTrailer } from "@/types/movie";

import { tmdbFetch } from "./client";

import { MovieVideosResponse } from "./types";

async function fetchVideos(
  movieId: number,
  language: string
): Promise<MovieTrailer[]> {
  const data =
    await tmdbFetch<MovieVideosResponse>(
      `/movie/${movieId}/videos?language=${language}`
    );

  return data.results;
}

export async function getMovieTrailer(
  movieId: number
): Promise<MovieTrailer | null> {
  if (!movieId) {
    throw new Error(
      "Movie ID is required"
    );
  }

  const ptVideos =
    await fetchVideos(
      movieId,
      "pt-BR"
    );

  const enVideos =
    await fetchVideos(
      movieId,
      "en-US"
    );

  const allVideos = [
    ...ptVideos,
    ...enVideos,
  ];

  const validTrailers =
    allVideos.filter(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

  const officialTrailer =
    validTrailers.find((video) => {
      const name =
        video.name.toLowerCase();

      return (
        name.includes("official") ||
        name.includes("oficial") ||
        name.includes("trailer")
      );
    });

  if (officialTrailer) {
    return officialTrailer;
  }

  if (validTrailers.length > 0) {
    return validTrailers[0];
  }

  const teaser = allVideos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Teaser"
  );

  return teaser || null;
}