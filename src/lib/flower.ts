export interface FlowerPetalState {
  id: string;
  isPlucked: boolean;
  poem: string;
}

export function formatFlowerPoem(poem: string) {
  return poem
    .split(/(?<=\.)\s+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function createFlowerPetals(poems: string[]): FlowerPetalState[] {
  return poems.map((poem, index) => ({
    id: `petal-${index + 1}`,
    isPlucked: false,
    poem,
  }));
}

export function pluckFlowerPetal(
  petals: FlowerPetalState[],
  petalId: string,
): FlowerPetalState[] {
  return petals.map((petal) =>
    petal.id === petalId
      ? {
          ...petal,
          isPlucked: true,
        }
      : petal,
  );
}

export function getNextRevealedPoem(
  petals: FlowerPetalState[],
  petalId: string,
): string | null {
  return petals.find((petal) => petal.id === petalId)?.poem ?? null;
}

export function getInitialRevealedPoem(petals: FlowerPetalState[]) {
  return petals[0]?.poem ?? null;
}

export function areAllPetalsPlucked(petals: FlowerPetalState[]) {
  return petals.every((petal) => petal.isPlucked);
}
