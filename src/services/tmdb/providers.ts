import { MovieWatchProvidersResult } from "@/types/movie";

import { tmdbFetch } from "./client";

import {
  ContentType,
  getTmdbContentType,
} from "./types";

type WatchProvidersResponse = {
  results: {
    BR?: MovieWatchProvidersResult;
  };
};

export async function getContentWatchProviders(
  contentId: number,
  contentType: ContentType
): Promise<MovieWatchProvidersResult | null> {
  if (!contentId) {
    throw new Error(
      "Content ID is required"
    );
  }

  const tmdbType =
    getTmdbContentType(
      contentType
    );

  const data =
    await tmdbFetch<WatchProvidersResponse>(
      `/${tmdbType}/${contentId}/watch/providers`
    );

  return data.results.BR || null;
}