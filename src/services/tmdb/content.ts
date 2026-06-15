import { Movie } from "@/types/movie";

import { tmdbFetch } from "./client";

import {
  ContentType,
  getTmdbContentType,
} from "./types";

type TmdbContentResponse = Movie & {
  name?: string;
  first_air_date?: string;
};

export async function getContentById(
  contentId: number,
  contentType: ContentType
): Promise<Movie> {
  if (!contentId) {
    throw new Error(
      "Content ID is required"
    );
  }

  const tmdbType =
    getTmdbContentType(contentType);

  const data =
    await tmdbFetch<TmdbContentResponse>(
      `/${tmdbType}/${contentId}?language=pt-BR`
    );

  return {
    ...data,
    title:
      data.title ||
      data.name ||
      "Título não encontrado",
  };
}