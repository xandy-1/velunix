"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FilterContainer } from "./filter-container";

type YearFilterProps = {
  selectedYear: string;
  setSelectedYear: (
    value: string
  ) => void;
};

const YEAR_OPTIONS = [
  {
    label: "Qualquer ano",
    value: JSON.stringify({
      min: null,
      max: null,
    }),
  },
  {
    label: "2020+",
    value: JSON.stringify({
      min: 2020,
      max: null,
    }),
  },
  {
    label: "2010+",
    value: JSON.stringify({
      min: 2010,
      max: null,
    }),
  },
  {
    label: "2000+",
    value: JSON.stringify({
      min: 2000,
      max: null,
    }),
  },
  {
    label: "1990+",
    value: JSON.stringify({
      min: 1990,
      max: null,
    }),
  },
  {
    label: "Clássicos (< 1990)",
    value: JSON.stringify({
      min: null,
      max: 1989,
    }),
  },
];

export function YearFilter({
  selectedYear,
  setSelectedYear,
}: YearFilterProps) {
  return (
    <FilterContainer title="Ano">
      <Select
        value={selectedYear}
        onValueChange={(value) =>
          setSelectedYear(value)
        }
      >
        <SelectTrigger className="h-12 w-full rounded-2xl border border-white/10 bg-zinc-800/80 text-white backdrop-blur">
          <SelectValue placeholder="Escolha o ano" />
        </SelectTrigger>

        <SelectContent className="border border-white/10 bg-zinc-900 text-white">
          {YEAR_OPTIONS.map((option) => (
            <SelectItem
              key={option.label}
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