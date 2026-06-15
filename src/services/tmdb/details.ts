import { MovieDetails } from "@/types/movie";

import { tmdbFetch } from "./client";

import {
  ContentType,
  getTmdbContentType,
} from "./types";

export async function getContentDetails(
  contentId: number,
  contentType: ContentType
): Promise<MovieDetails> {
  if (!contentId) {
    throw new Error(
      "Content ID is required"
    );
  }

  const tmdbType =
    getTmdbContentType(
      contentType
    );

  const details =
    await tmdbFetch<any>(
      `/${tmdbType}/${contentId}?language=pt-BR`
    );

  if (tmdbType === "tv") {
    return {
      id: details.id,
      runtime:
        details.episode_run_time?.[0] ||
        0,
      ageRating: "Livre",
    };
  }

  const releaseDates =
    await tmdbFetch<any>(
      `/movie/${contentId}/release_dates`
    );

  function findCertification(
    country: string
  ) {
    const release =
      releaseDates.results.find(
        (item: any) =>
          item.iso_3166_1 ===
          country
      );

    return (
      release?.release_dates?.find(
        (item: any) =>
          item.certification
      )?.certification || null
    );
  }

  const certification =
    findCertification("BR") ||
    findCertification("US") ||
    "Livre";

  return {
    id: details.id,
    runtime: details.runtime,
    ageRating: certification,
  };
}