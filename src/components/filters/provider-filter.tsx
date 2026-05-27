"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Provider } from "@/types/movie";

import { FilterContainer } from "./filter-container";

type ProviderFilterProps = {
  providers: Provider[];
  selectedProvider: number | null;
  setSelectedProvider: (
    id: number | null
  ) => void;
};

export function ProviderFilter({
  providers,
  selectedProvider,
  setSelectedProvider,
}: ProviderFilterProps) {
  return (
    <FilterContainer title="Streaming">
      <Select
        value={
          selectedProvider
            ? String(selectedProvider)
            : "all"
        }
        onValueChange={(value) =>
          setSelectedProvider(
            value === "all"
              ? null
              : Number(value)
          )
        }
      >
        <SelectTrigger className="h-12 w-full rounded-2xl border border-white/10 bg-zinc-800/80 text-white backdrop-blur">
          <SelectValue placeholder="Todos os streamings" />
        </SelectTrigger>

        <SelectContent className="border border-white/10 bg-zinc-900 text-white">
          <SelectItem value="all">
            Todos os streamings
          </SelectItem>

          {providers.map((provider) => (
            <SelectItem
              key={provider.id}
              value={String(provider.id)}
            >
              {provider.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FilterContainer>
  );
}