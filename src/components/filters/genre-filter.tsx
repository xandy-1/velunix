"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Genre } from "@/types/movie";

import { FilterContainer } from "./filter-container";

type GenreFilterProps = {
  genres: Genre[];
  selectedGenre: number | null;
  setSelectedGenre: (
    id: number | null
  ) => void;
};

export function GenreFilter({
  genres,
  selectedGenre,
  setSelectedGenre,
}: GenreFilterProps) {
  return (
    <FilterContainer title="Gênero">
      <Select
        value={
          selectedGenre
            ? String(selectedGenre)
            : "all"
        }
        onValueChange={(value) =>
          setSelectedGenre(
            value === "all"
              ? null
              : Number(value)
          )
        }
      >
        <SelectTrigger className="h-12 w-full rounded-2xl border border-white/10 bg-zinc-800/80 text-white backdrop-blur">
          <SelectValue placeholder="Todos os gêneros" />
        </SelectTrigger>

        <SelectContent className="border border-white/10 bg-zinc-900 text-white">
          <SelectItem value="all">
            Todos os gêneros
          </SelectItem>

          {genres.map((genre) => (
            <SelectItem
              key={genre.id}
              value={String(genre.id)}
            >
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FilterContainer>
  );
}