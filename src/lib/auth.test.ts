import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validatePasswordAttempt } from "@/lib/auth";

describe("validatePasswordAttempt", () => {
  it("matches answers case-insensitively", () => {
    assert.equal(validatePasswordAttempt("PaRiS", ["paris"]), true);
  });

  it("matches answers with minor typos", () => {
    assert.equal(validatePasswordAttempt("cofee shop", ["coffee shop"]), true);
  });

  it("ignores punctuation and extra spaces", () => {
    assert.equal(
      validatePasswordAttempt("  the, coffee   shop! ", ["the coffee shop"]),
      true,
    );
  });

  it("returns false for empty input", () => {
    assert.equal(validatePasswordAttempt("   ", ["paris"]), false);
  });

  it("returns false when no answer matches", () => {
    assert.equal(validatePasswordAttempt("london", ["paris", "coffee shop"]), false);
  });
});
