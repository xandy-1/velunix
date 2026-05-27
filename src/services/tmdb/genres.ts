import { Genre } from "@/types/movie";

import { tmdbFetch } from "./client";

import { GenresResponse } from "./types";

export async function getGenres(): Promise<
  Genre[]
> {
  const data =
    await tmdbFetch<GenresResponse>(
      "/genre/movie/list?language=pt-BR"
    );

  return data.genres;
}