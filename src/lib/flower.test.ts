import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  areAllPetalsPlucked,
  createFlowerPetals,
  getNextRevealedPoem,
  pluckFlowerPetal,
} from "@/lib/flower";

describe("flower helpers", () => {
  it("creates petals from poem strings", () => {
    assert.deepEqual(createFlowerPetals(["One", "Two"]), [
      { id: "petal-1", isPlucked: false, poem: "One" },
      { id: "petal-2", isPlucked: false, poem: "Two" },
    ]);
  });

  it("plucks only the targeted petal", () => {
    const petals = createFlowerPetals(["One", "Two"]);
    const next = pluckFlowerPetal(petals, "petal-2");

    assert.deepEqual(next, [
      { id: "petal-1", isPlucked: false, poem: "One" },
      { id: "petal-2", isPlucked: true, poem: "Two" },
    ]);
  });

  it("reveals the poem for a selected petal", () => {
    const petals = createFlowerPetals(["One", "Two"]);

    assert.equal(getNextRevealedPoem(petals, "petal-2"), "Two");
    assert.equal(getNextRevealedPoem(petals, "missing"), null);
  });

  it("detects when all petals are plucked", () => {
    assert.equal(areAllPetalsPlucked(createFlowerPetals(["One"])), false);
    assert.equal(
      areAllPetalsPlucked([
        { id: "petal-1", isPlucked: true, poem: "One" },
        { id: "petal-2", isPlucked: true, poem: "Two" },
      ]),
      true,
    );
  });
});
