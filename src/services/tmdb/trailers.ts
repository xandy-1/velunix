import { MovieTrailer } from "@/types/movie";

import { tmdbFetch } from "./client";

import {
  ContentType,
  getTmdbContentType,
  MovieVideosResponse,
} from "./types";

async function fetchVideos(
  contentId: number,
  contentType: ContentType,
  language: string
): Promise<MovieTrailer[]> {
  const tmdbType =
    getTmdbContentType(
      contentType
    );

  const data =
    await tmdbFetch<MovieVideosResponse>(
      `/${tmdbType}/${contentId}/videos?language=${language}`
    );

  return data.results;
}

export async function getContentTrailer(
  contentId: number,
  contentType: ContentType
): Promise<MovieTrailer | null> {
  if (!contentId) {
    throw new Error(
      "Content ID is required"
    );
  }

  const [ptVideos, enVideos] =
    await Promise.all([
      fetchVideos(
        contentId,
        contentType,
        "pt-BR"
      ),
      fetchVideos(
        contentId,
        contentType,
        "en-US"
      ),
    ]);

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

  return (
    allVideos.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Teaser"
    ) || null
  );
}