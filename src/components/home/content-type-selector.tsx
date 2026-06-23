import { ContentType } from "@/services/tmdb/types";

import { CONTENT_OPTIONS } from "@/constants/home";

type Props = {
  contentType: ContentType;
  setContentType: (value: ContentType) => void;
};

export function ContentTypeSelector({
  contentType,
  setContentType,
}: Props) {
  return (
    <div className="mb-10">
      <div className="mb-5 text-center">
        <h3 className="text-2xl font-black text-white md:text-3xl">
          O que você quer assistir hoje?
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          Escolha uma categoria e deixe o Velunix encontrar algo para você.
        </p>
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

      <div className="mt-10 grid grid-cols-3 gap-4">
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
    </div>
  );
}