export const HERO_MOVIES = [
  {
    id: 157336,
    title: "Interstellar",
    posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.6,
    genreLabel: "Ficção científica",
    ageRating: "12",
  },
  {
    id: 27205,
    title: "A Origem",
    posterPath: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    rating: 8.4,
    genreLabel: "Ficção científica",
    ageRating: "14",
  },
  {
    id: 155,
    title: "Batman: O Cavaleiro das Trevas",
    posterPath: "/iGZX91hIqM9Uu0KGhd4MUaJ0Rtm.jpg",
    rating: 8.5,
    genreLabel: "Ação",
    ageRating: "12",
  },
  {
    id: 244786,
    title: "Whiplash",
    posterPath: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    rating: 8.4,
    genreLabel: "Drama",
    ageRating: "12",
  },
  {
    id: 438631,
    title: "Duna",
    posterPath: "/obhGsx4PE9OzsVGtIfoLAIIWGNb.jpg",
    rating: 7.8,
    genreLabel: "Ficção científica",
    ageRating: "14",
  },
  {
    id: 475557,
    title: "Coringa",
    posterPath: "/xLxgVxFWvb9hhUyCDDXxRPPnFck.jpg",
    rating: 8.1,
    genreLabel: "Drama",
    ageRating: "16",
  },
];

import { ContentType } from "@/services/tmdb/types";

export const CONTENT_OPTIONS: {
  value: ContentType;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    value: "movie",
    label: "Filmes",
    icon: "🎬",
    description:
      "Recomendações de filmes para assistir agora.",
  },
  {
    value: "tv",
    label: "Séries",
    icon: "📺",
    description:
      "Séries para começar sem ficar rolando catálogo.",
  },
  {
    value: "anime",
    label: "Animes",
    icon: "🌸",
    description:
      "Animes populares para descobrir seu próximo vício.",
  },
];