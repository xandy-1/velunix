"use client";

import {
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { 
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  GenreFilter,
  ProviderFilter,
  RatingFilter,
  RuntimeFilter,
  YearFilter,
} from "@/components/filters";

import { Navbar } from "@/components/layout/navbar";
import { AppButton } from "@/components/ui/button";

import { STREAMING_OPTIONS } from "@/constants/providers";

import {
  fadeUp,
  springTransition,
  staggerContainer,
} from "@/lib/animations";

import {
  getGenres,
  getContentDetails,
  getContentWatchProviders,
} from "@/services/tmdb";

import { ContentType } from "@/services/tmdb/types";

import {
  Genre,
  MovieWatchProvidersResult,
} from "@/types/movie";

import { buildImageUrl } from "@/utils/build-image-url";
import { formatRuntime } from "@/utils/format-runtime";


const HERO_MOVIES = [
  
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

const CONTENT_OPTIONS: {
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



function getInitialContentType(
  value: string | null
): ContentType {
  if (
    value === "movie" ||
    value === "tv" ||
    value === "anime"
  ) {
    return value;
  }

  return "movie";
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [heroMovie, setHeroMovie] =
    useState(HERO_MOVIES[0]);

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

  const [genres, setGenres] =
    useState<Genre[]>([]);

  const [heroDuration, setHeroDuration] =
    useState(0);

  const [
    heroProviders,
    setHeroProviders,
  ] =
    useState<MovieWatchProvidersResult | null>(
      null
    );

  const [contentType, setContentType] =
    useState<ContentType>(
      getInitialContentType(
        searchParams.get("type")
      )
    );

  const [minRating, setMinRating] =
    useState(
      Number(
        searchParams.get("rating") ||
          6
      )
    );

  const [
    selectedGenre,
    setSelectedGenre,
  ] = useState<number | null>(
    searchParams.get("genre")
      ? Number(
          searchParams.get("genre")
        )
      : null
  );

  const [
    selectedProvider,
    setSelectedProvider,
  ] = useState<number | null>(
    searchParams.get("provider")
      ? Number(
          searchParams.get(
            "provider"
          )
        )
      : null
  );

  const [
    selectedRuntime,
    setSelectedRuntime,
  ] = useState(
    JSON.stringify({
      min: searchParams.get(
        "minRuntime"
      )
        ? Number(
            searchParams.get(
              "minRuntime"
            )
          )
        : null,

      max: searchParams.get(
        "maxRuntime"
      )
        ? Number(
            searchParams.get(
              "maxRuntime"
            )
          )
        : null,
    })
  );

  const [
    selectedYear,
    setSelectedYear,
  ] = useState(
    JSON.stringify({
      min: searchParams.get("minYear")
        ? Number(
            searchParams.get(
              "minYear"
            )
          )
        : null,

      max: searchParams.get("maxYear")
        ? Number(
            searchParams.get(
              "maxYear"
            )
          )
        : null,
    })
  );

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [
          genresData,
          details,
          providers,
        ] = await Promise.all([
          getGenres(),
         getContentDetails(heroMovie.id, "movie"),
          getContentWatchProviders(heroMovie.id, "movie"),
        ]);

        setGenres(genresData);

        setHeroDuration(
          details.runtime || 0
        );

        setHeroProviders(providers);
      } catch (error) {
        console.error(
          "Erro ao carregar home:",
          error
        );
      }
    }

    loadHomeData();
  }, [heroMovie.id]);

  function buildPickParams() {
    const params =
      new URLSearchParams();

    params.set("type", contentType);

    params.set(
      "rating",
      String(minRating)
    );

    if (selectedGenre) {
      params.set(
        "genre",
        String(selectedGenre)
      );
    }

    if (selectedProvider) {
      params.set(
        "provider",
        String(selectedProvider)
      );
    }

    const runtime =
      JSON.parse(selectedRuntime);

    if (runtime.min !== null) {
      params.set(
        "minRuntime",
        String(runtime.min)
      );
    }

    if (runtime.max !== null) {
      params.set(
        "maxRuntime",
        String(runtime.max)
      );
    }

    const year =
      JSON.parse(selectedYear);

    if (year.min !== null) {
      params.set(
        "minYear",
        String(year.min)
      );
    }

    if (year.max !== null) {
      params.set(
        "maxYear",
        String(year.max)
      );
    }

    return params;
  }

  function handlePickMovie() {
    const params =
      buildPickParams();

    router.push(
      `/pick?${params.toString()}`
    );
  }

  function handleSearchMovie() {
    router.push("/search");
  }

  function scrollToFilters() {
    document
      .getElementById("filters")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-28 pt-28 text-white md:pb-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-7xl"
        >
          <section className="grid min-h-[78vh] items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              variants={fadeUp}
              transition={
                springTransition
              }
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-zinc-200">
                <span>🎲</span>

                <span>
                  Uma escolha. Menos indecisão.
                </span>
              </div>

              <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                Pare de perder{" "}
                <span className="text-red-600">
                  tempo escolhendo
                </span>{" "}
                 o que assistir.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl">
                Receba recomendações inteligentes,
                descubra onde assistir e encontre algo
                bom para ver em segundos.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={handlePickMovie}
                  className="group rounded-2xl bg-red-600 px-7 py-4 text-base font-black text-white shadow-2xl shadow-red-600/20 transition hover:scale-[1.03] hover:bg-red-500 active:scale-[0.98]"
                >
                  🎲 Escolher por mim

                  <span className="ml-3 inline-block transition group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleSearchMovie}
                  className="group rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:scale-[1.03] hover:border-white/30 hover:bg-white/10 active:scale-[0.98]"
                >
                  🔎 Pesquisar título

                  <span className="ml-3 inline-block transition group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={scrollToFilters}
                className="mt-5 text-sm font-medium text-zinc-400 transition hover:text-white"
              >
                ⚙️ Quero ajustar os filtros primeiro
              </button>

              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  [
                    "🎯",
                    "Recomendações inteligentes",
                  ],
                  [
                    "📺",
                    "Veja onde assistir",
                  ],
                  [
                    "❤️",
                    "Salve favoritos",
                  ],
                ].map(
                  ([icon, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur"
                    >
                      <div className="text-2xl">
                        {icon}
                      </div>

                      <p className="mt-3 text-sm font-semibold text-zinc-200">
                        {label}
                      </p>
                    </div>
                  )
                )}
              </div>
            </motion.div>

           <AnimatePresence mode="wait">
              <motion.div
                key={heroMovie.id}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="relative mx-auto w-full max-w-md"
              >
              <div className="absolute -inset-8 rounded-full bg-red-600/20 blur-3xl" />

              <div className="relative rotate-2 rounded-[2rem] border border-red-500/30 bg-zinc-950 p-4 shadow-2xl shadow-red-950/40 transition hover:rotate-0">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
                  <div className="relative flex aspect-[3/4] items-end overflow-hidden p-5">
                    <img
                      src={buildImageUrl(
                        heroMovie.posterPath,
                        "w780"
                      )}
                      alt={`Pôster de ${heroMovie.title}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />

                    <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-sm font-bold backdrop-blur">
                      ⭐ {heroMovie.rating}
                    </div>

                    <div className="relative">
                      <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-400">
                        Recomendação
                      </p>

                      <h2 className="mt-2 text-4xl font-black uppercase">
                        {heroMovie.title}
                      </h2>

                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-300">
                        <span>
                          ⏱{" "}
                          {formatRuntime(
                            heroDuration
                          )}
                        </span>

                        <span>
                          🎬{" "}
                          {
                            heroMovie.genreLabel
                          }
                        </span>

                        <span>
                          {
                            heroMovie.ageRating
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-sm text-zinc-500">
                        Disponível em:
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {heroProviders?.flatrate
                          ?.slice(0, 3)
                          .map(
                            (provider) => (
                              <span
                                key={
                                  provider.provider_id
                                }
                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200"
                              >
                                {
                                  provider.provider_name
                                }
                              </span>
                            )
                          )}

                        {!heroProviders
                          ?.flatrate
                          ?.length && (
                          <>
                            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200">
                              Netflix
                            </span>

                            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200">
                              Prime Video
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold transition hover:bg-red-500">
                        ▶ Trailer
                      </button>

                      <button
                        type="button"
                        onClick={
                          handlePickMovie
                        }
                        className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
                      >
                        🎲 Outro
                      </button>
                    </div>

                    <button className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-zinc-200">
                      📺 Ver onde assistir
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-center gap-2">
                {HERO_MOVIES.map((item) => (
                  <div
                    key={item.id}
                    className={`h-2 rounded-full transition-all ${
                      item.id === heroMovie.id
                        ? "w-8 bg-red-500"
                        : "w-2 bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
            </AnimatePresence>
          </section>

          <motion.section
            variants={fadeUp}
            transition={
              springTransition
            }
            className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8"
          >
            <p className="text-center text-sm font-bold uppercase tracking-[0.35em] text-red-500">
              Como funciona
            </p>

            <h2 className="mt-3 text-center text-3xl font-black md:text-4xl">
              Você escolhe. O Velunix encontra.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "1",
                  icon: "⚙️",
                  title:
                    "Escolha filtros",
                  text: "Defina tipo, nota, gênero, streaming, duração e ano. Ou deixe tudo no automático.",
                },
                {
                  step: "2",
                  icon: "🎲",
                  title:
                    "Receba uma recomendação",
                  text: "O Velunix encontra uma opção compatível com o que você quer assistir.",
                },
                {
                  step: "3",
                  icon: "🍿",
                  title:
                    "Assista sem perder tempo",
                  text: "Veja trailer, onde assistir e salve o que gostou para depois.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-white/10 bg-zinc-950/70 p-5"
                >
                  <div className="absolute right-5 top-5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-black">
                    {item.step}
                  </div>

                  <div className="text-4xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="filters"
            variants={fadeUp}
            transition={
              springTransition
            }
            className="mt-10 scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8"
          >
            <div className="mb-8 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-red-500">
                Personalize
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Escolha o que assistir
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
                Escolha filmes, séries ou animes. Depois ajuste os filtros se quiser uma recomendação mais precisa.
              </p>
            </div>

            <div className="mb-10">
              <div className="mb-5 text-center">
                <h3 className="text-2xl font-black text-white md:text-3xl">
                  O que você quer assistir hoje?
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Escolha uma categoria e deixe o Velunix encontrar algo para você.
                </p>
              </div>

              {/* ESTATÍSTICAS */}
              <div className="mb-10 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 text-center">
                <div className="text-3xl">
                  🎬
                </div>

                <p className="mt-3 text-lg font-black text-white">
                  Milhares de filmes
                </p>

                <p className="mt-2 text-xs text-zinc-400">
                  Dos clássicos aos lançamentos.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 text-center">
                <div className="text-3xl">
                  📺
                </div>

                <p className="mt-3 text-lg font-black text-white">
                  Séries populares
                </p>

                <p className="mt-2 text-xs text-zinc-400">
                  Encontre sua próxima maratona.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 text-center">
                <div className="text-3xl">
                  🌸
                </div>

                <p className="mt-3 text-lg font-black text-white">
                  Catálogo de animes
                </p>

                <p className="mt-2 text-xs text-zinc-400">
                  Descubra novos favoritos.
                </p>
              </div>
            </div>

              <div className="grid gap-4 md:grid-cols-3">
                {CONTENT_OPTIONS.map((option) => {
                  const active =
                    contentType === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setContentType(option.value)
                      }
                      className={
                        active
                          ? "group relative overflow-hidden rounded-3xl border border-red-500 bg-red-500/15 p-6 text-left shadow-2xl shadow-red-500/10 transition hover:scale-[1.02]"
                          : "group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 p-6 text-left transition hover:scale-[1.02] hover:border-red-500/40 hover:bg-white/[0.04]"
                      }
                    >
                      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-500/10 blur-2xl transition group-hover:bg-red-500/20" />

                      <div className="relative">
                        <div className="text-5xl">
                          {option.icon}
                        </div>

                        <p className="mt-5 text-2xl font-black text-white">
                          {option.label}
                        </p>

                        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                          {option.description}
                        </p>

                        <div className="mt-5 text-sm font-bold text-red-400">
                          {active
                            ? "Selecionado"
                            : "Selecionar"}{" "}
                          →
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <RatingFilter
                minRating={minRating}
                setMinRating={
                  setMinRating
                }
              />

              <GenreFilter
                genres={genres}
                selectedGenre={
                  selectedGenre
                }
                setSelectedGenre={
                  setSelectedGenre
                }
              />

              <ProviderFilter
                providers={
                  STREAMING_OPTIONS
                }
                selectedProvider={
                  selectedProvider
                }
                setSelectedProvider={
                  setSelectedProvider
                }
              />

              <RuntimeFilter
                selectedRuntime={
                  selectedRuntime
                }
                setSelectedRuntime={
                  setSelectedRuntime
                }
              />

              <YearFilter
                selectedYear={
                  selectedYear
                }
                setSelectedYear={
                  setSelectedYear
                }
              />
            </div>

            <div className="mt-8 flex justify-center">
              <AppButton
                onClick={handlePickMovie}
                className="w-full max-w-xs"
              >
                🎲 Escolher
              </AppButton>
            </div>
          </motion.section>

          <motion.section
            variants={fadeUp}
            transition={
              springTransition
            }
            className="mt-10 rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-950/40 via-zinc-950 to-zinc-950 p-6 md:p-8"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-black">
                  Pronto para encontrar algo para assistir?
                </h2>

                <p className="mt-3 text-zinc-400">
                  Escolha agora ou pesquise um título específico.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handlePickMovie}
                  className="rounded-2xl bg-red-600 px-6 py-4 font-bold text-white transition hover:scale-[1.03] hover:bg-red-500"
                >
                  🎲 Escolher agora
                </button>

                <button
                  type="button"
                  onClick={handleSearchMovie}
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white transition hover:scale-[1.03] hover:bg-white/10"
                >
                  🔎 Pesquisar título
                </button>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          Carregando...
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}