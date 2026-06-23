import { Genre } from "@/types/movie";

import { tmdbFetch } from "./client";

import {
  ContentType,
  GenresResponse,
} from "./types";

export async function getGenresByType(
  contentType: ContentType
): Promise<Genre[]> {
  const tmdbType =
    contentType === "movie"
      ? "movie"
      : "tv";

  const data =
    await tmdbFetch<GenresResponse>(
      `/genre/${tmdbType}/list?language=pt-BR`
    );

  return data.genres;
}

export async function getGenres(): Promise<Genre[]> {
  return getGenresByType("movie");
}