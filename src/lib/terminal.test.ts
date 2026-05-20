import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { executeTerminalCommand } from "@/lib/terminal";

describe("executeTerminalCommand", () => {
  const terminalSecrets = {
    help: "Try: cat, flower, phool, whoami, ls, pwd, open letter, clear, sudo love her, exit",
    ascii: "<3 <3 <3",
    "sudo love her": "Heart unlocked.",
  };

  it("returns help output", () => {
    assert.deepEqual(executeTerminalCommand("help", terminalSecrets), {
      output: "Try: cat, flower, phool, whoami, ls, pwd, open letter, clear, sudo love her, exit",
      shouldClose: false,
    });
  });

  it("returns animated cat frames", () => {
    const result = executeTerminalCommand("cat", terminalSecrets);

    assert.equal(result.output, "Summoning terminal cat...");
    assert.equal(Array.isArray(result.frames), true);
    assert.equal(result.frames?.length, 3);
    assert.equal(result.shouldClose, false);
  });

  it("returns animated flower frames", () => {
    const result = executeTerminalCommand("flower", terminalSecrets);

    assert.equal(result.output, "Growing something soft...");
    assert.equal(Array.isArray(result.frames), true);
    assert.equal(result.frames?.length, 3);
    assert.equal(result.shouldClose, false);
  });

  it("normalizes custom commands", () => {
    assert.deepEqual(executeTerminalCommand("  SUDO   LOVE HER ", terminalSecrets), {
      output: "Heart unlocked.",
      shouldClose: false,
    });
  });

  it("returns close intent for exit", () => {
    assert.deepEqual(executeTerminalCommand("exit", terminalSecrets), {
      output: "Closing terminal window...",
      shouldClose: true,
    });
  });

  it("clears terminal history when asked", () => {
    assert.deepEqual(executeTerminalCommand("clear", terminalSecrets), {
      output: "Terminal cleared.",
      shouldClear: true,
      shouldClose: false,
    });
  });

  it("handles empty commands", () => {
    assert.deepEqual(executeTerminalCommand("   ", terminalSecrets), {
      output: "Type a command first. Try `help` to get started.",
      shouldClose: false,
    });
  });

  it("returns unknown command output when missing", () => {
    assert.deepEqual(executeTerminalCommand("unknown", terminalSecrets), {
      output: "Unknown command: unknown. Try `help`.",
      shouldClose: false,
    });
  });

  it("returns fake filesystem responses", () => {
    assert.equal(
      executeTerminalCommand("ls", terminalSecrets).output.includes("love-letter.txt"),
      true,
    );
    assert.equal(executeTerminalCommand("pwd", terminalSecrets).output, "/heart/memories/us");
    assert.equal(executeTerminalCommand("whoami", terminalSecrets).output, "your favorite person");
  });
});
