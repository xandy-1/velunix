import { MovieDetails } from "@/types/movie";

import { tmdbFetch } from "./client";

export async function getMovieDetails(
  movieId: number
): Promise<MovieDetails> {
  if (!movieId) {
    throw new Error(
      "Movie ID is required"
    );
  }

  const details =
    await tmdbFetch<any>(
      `/movie/${movieId}?language=pt-BR`
    );

  const releaseDates =
    await tmdbFetch<any>(
      `/movie/${movieId}/release_dates`
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

  function normalizeCertification(
    certification: string | null
  ): string {
    const map: Record<
      string,
      string
    > = {
      G: "Livre",
      PG: "10",
      "PG-13": "13",
      R: "16",
      "NC-17": "18",
    };

    if (!certification) {
      return "Livre";
    }

    return (
      map[certification] ||
      certification
    );
  }

  const rawCertification =
    findCertification("BR") ||
    findCertification("US") ||
    "Livre";

  return {
    id: details.id,
    runtime: details.runtime,
    ageRating:
      normalizeCertification(
        rawCertification
      ),
  };
}