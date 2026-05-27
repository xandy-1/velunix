export function pickRandom<T>(
  items: T[]
): T | null {
  if (!items.length) {
    return null;
  }

  const randomIndex =
    Math.floor(
      Math.random() *
        items.length
    );

  return items[randomIndex];
}