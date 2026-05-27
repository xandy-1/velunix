import { env } from "@/lib/env";

const BASE_URL =
  "https://api.themoviedb.org/3";

const DEFAULT_OPTIONS: RequestInit = {
  method: "GET",

  headers: {
    accept: "application/json",
  },

  cache: "force-cache",
};

export async function tmdbFetch<T>(
  endpoint: string
): Promise<T> {
  if (!env.TMDB_API_KEY) {
    throw new Error(
      "TMDB_API_KEY não configurada."
    );
  }

  const separator =
    endpoint.includes("?")
      ? "&"
      : "?";

  const url =
    `${BASE_URL}${endpoint}${separator}api_key=${env.TMDB_API_KEY}`;

  const response = await fetch(
    url,
    DEFAULT_OPTIONS
  );

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status}`
    );
  }

  return response.json();
}