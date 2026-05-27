export function formatRuntime(
  runtime: number
): string {
  if (!runtime || runtime <= 0) {
    return "Duração desconhecida";
  }

  const hours =
    Math.floor(runtime / 60);

  const minutes =
    runtime % 60;

  if (hours === 0) {
    return `${minutes}min`;
  }

  return `${hours}h ${minutes}min`;
}