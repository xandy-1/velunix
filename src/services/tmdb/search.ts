import { Movie } from "@/types/movie";

import { tmdbFetch } from "./client";

import { ContentType } from "./types";

export type SearchContentType =
  | ContentType
  | "all";

export type SearchResult = Movie & {
  name?: string;
  media_type?: "movie" | "tv";
  first_air_date?: string;
  original_language?: string;
  content_type: ContentType;
};

type SearchResponse = {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
};

function normalizeResult(
  item: SearchResult,
  fallbackType: ContentType
): SearchResult {
  const isAnime =
    item.media_type === "tv" &&
    item.original_language === "ja" &&
    item.genre_ids?.includes(16);

  const contentType =
    fallbackType === "anime" || isAnime
      ? "anime"
      : item.media_type === "tv"
        ? "tv"
        : fallbackType === "tv"
          ? "tv"
          : "movie";

  return {
    ...item,
    title: item.title || item.name || "Título não encontrado",
    content_type: contentType,
  };
}

export async function searchContent(
  query: string,
  type: SearchContentType = "all"
): Promise<SearchResult[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const endpoint =
    type === "all"
      ? `/search/multi?language=pt-BR&query=${encodeURIComponent(
          normalizedQuery
        )}&include_adult=false`
      : type === "movie"
        ? `/search/movie?language=pt-BR&query=${encodeURIComponent(
            normalizedQuery
          )}&include_adult=false`
        : `/search/tv?language=pt-BR&query=${encodeURIComponent(
            normalizedQuery
          )}&include_adult=false`;

  const data =
    await tmdbFetch<SearchResponse>(
      endpoint
    );

  return data.results
    .filter((item) => {
      if (type === "all") {
        return (
          item.media_type === "movie" ||
          item.media_type === "tv"
        );
      }

      if (type === "anime") {
        return (
          item.original_language === "ja" &&
          item.genre_ids?.includes(16)
        );
      }

      return true;
    })
    .map((item) =>
      normalizeResult(
        item,
        type === "all" ? "movie" : type
      )
    )
    .filter(
      (item) =>
        item.id &&
        item.poster_path &&
        item.title &&
        item.vote_average > 0
    );
}