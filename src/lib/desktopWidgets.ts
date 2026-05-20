import type { TimelineEntry } from "@/types/content";

export function selectMemoryOfTheDay(
  entries: TimelineEntry[],
  seed = new Date().toDateString(),
): TimelineEntry | null {
  if (entries.length === 0) {
    return null;
  }

  const hash = seed.split("").reduce((total, character) => {
    return total + character.charCodeAt(0);
  }, 0);

  return entries[hash % entries.length] ?? null;
}
