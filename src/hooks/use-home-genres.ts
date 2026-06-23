import { useEffect, useState } from "react";

import { getGenresByType } from "@/services/tmdb";

import { ContentType } from "@/services/tmdb/types";

import { Genre } from "@/types/movie";

export function useHomeGenres(
  contentType: ContentType
) {
  const [genres, setGenres] =
    useState<Genre[]>([]);

  useEffect(() => {
    async function loadGenres() {
      try {
        const data =
          await getGenresByType(
            contentType
          );

        setGenres(data);
      } catch (error) {
        console.error(
          "Erro ao carregar gêneros:",
          error
        );
      }
    }

    loadGenres();
  }, [contentType]);

  return genres;
}