import { useEffect, useState } from "react";

import { HERO_MOVIES } from "@/constants/home";

import {
  getContentDetails,
  getContentWatchProviders,
} from "@/services/tmdb";

import { MovieWatchProvidersResult } from "@/types/movie";

export function useHomeHero() {
  const [heroMovie, setHeroMovie] =
    useState(HERO_MOVIES[0]);

  const [heroDuration, setHeroDuration] =
    useState(0);

  const [
    heroProviders,
    setHeroProviders,
  ] =
    useState<MovieWatchProvidersResult | null>(
      null
    );

  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * HERO_MOVIES.length
    );

    setHeroMovie(HERO_MOVIES[randomIndex]);

    const interval = setInterval(() => {
      setHeroMovie((currentMovie) => {
        const currentIndex =
          HERO_MOVIES.findIndex(
            (movie) =>
              movie.id === currentMovie.id
          );

        const nextIndex =
          (currentIndex + 1) %
          HERO_MOVIES.length;

        return HERO_MOVIES[nextIndex];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [details, providers] =
          await Promise.all([
            getContentDetails(
              heroMovie.id,
              "movie"
            ),
            getContentWatchProviders(
              heroMovie.id,
              "movie"
            ),
          ]);

        setHeroDuration(
          details.runtime || 0
        );

        setHeroProviders(providers);
      } catch (error) {
        console.error(
          "Erro ao carregar hero:",
          error
        );
      }
    }

    loadHomeData();
  }, [heroMovie.id]);

  return {
    heroMovie,
    heroMovies: HERO_MOVIES,
    heroDuration,
    heroProviders,
  };
}