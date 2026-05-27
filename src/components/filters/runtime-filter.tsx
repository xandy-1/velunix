"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FilterContainer } from "./filter-container";

type RuntimeFilterProps = {
  selectedRuntime: string;
  setSelectedRuntime: (
    value: string
  ) => void;
};

const RUNTIME_OPTIONS = [
  {
    label: "Qualquer duração",
    value: JSON.stringify({
      min: null,
      max: null,
    }),
  },
  {
    label: "Curto (< 90 min)",
    value: JSON.stringify({
      min: null,
      max: 89,
    }),
  },
  {
    label: "Médio (90–120 min)",
    value: JSON.stringify({
      min: 90,
      max: 120,
    }),
  },
  {
    label: "Longo (120+ min)",
    value: JSON.stringify({
      min: 121,
      max: null,
    }),
  },
];

export function RuntimeFilter({
  selectedRuntime,
  setSelectedRuntime,
}: RuntimeFilterProps) {
  return (
    <FilterContainer title="Duração">
      <Select
        value={selectedRuntime}
        onValueChange={(value) =>
          setSelectedRuntime(value)
        }
      >
        <SelectTrigger className="h-12 w-full rounded-2xl border border-white/10 bg-zinc-800/80 text-white backdrop-blur">
          <SelectValue placeholder="Escolha a duração" />
        </SelectTrigger>

        <SelectContent className="border border-white/10 bg-zinc-900 text-white">
          {RUNTIME_OPTIONS.map((option) => (
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