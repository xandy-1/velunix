"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FilterContainer } from "./filter-container";

type RatingFilterProps = {
  minRating: number;
  setMinRating: (
    value: number
  ) => void;
};

const RATING_OPTIONS = [
  { label: "3+", value: "3" },
  { label: "4+", value: "4" },
  { label: "5+", value: "5" },
  { label: "6+", value: "6" },
  { label: "7+", value: "7" },
  { label: "8+", value: "8" },
];

export function RatingFilter({
  minRating,
  setMinRating,
}: RatingFilterProps) {
  return (
    <FilterContainer title="Nota mínima">
      <Select
        value={String(minRating)}
        onValueChange={(value) =>
          setMinRating(Number(value))
        }
      >
        <SelectTrigger className="h-12 w-full rounded-2xl border border-white/10 bg-zinc-800/80 text-white backdrop-blur">
          <SelectValue placeholder="Escolha a nota mínima" />
        </SelectTrigger>

        <SelectContent className="border border-white/10 bg-zinc-900 text-white">
          {RATING_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FilterContainer>
  );
}