type Props = {
  selectedGenre: string | null;
  setSelectedGenre: (
    value: string | null
  ) => void;

  genres: {
    id: string;
    name: string;
  }[];
};

export function AnimeGenreFilter({
  genres,
  selectedGenre,
  setSelectedGenre,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
      <p className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">
        Gênero de Anime
      </p>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const active =
            selectedGenre === genre.id;

          return (
            <button
              key={genre.id}
              type="button"
              onClick={() =>
                setSelectedGenre(
                  active
                    ? null
                    : genre.id
                )
              }
              className={
                active
                  ? "rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                  : "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300 hover:bg-white/10"
              }
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}