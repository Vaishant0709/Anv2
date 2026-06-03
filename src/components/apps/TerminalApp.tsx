"use client";

import { useEffect, useState } from "react";

import { AppWindowHeader } from "@/components/ui/AppWindowHeader";
import { Panel } from "@/components/ui/Panel";
import { useDesktop } from "@/context/DesktopContext";
import { siteData } from "@/data/siteData";
import { validateSiteContent } from "@/lib/content";
import { logger } from "@/lib/logger";
import { executeTerminalCommand, type TerminalHistoryEntry } from "@/lib/terminal";

import { TerminalHistory } from "./terminal/TerminalHistory";
import { TerminalInput } from "./terminal/TerminalInput";

const content = validateSiteContent(siteData);

export function TerminalApp() {
  const { closeWindow } = useDesktop();
  const [history, setHistory] = useState<TerminalHistoryEntry[]>([]);

  useEffect(() => {
    logger.info("[terminal] app opened");
  }, []);

  async function handleSubmit(command: string) {
    const normalizedCommand = command.trim().toLowerCase().replace(/\s+/g, " ");

    if (!normalizedCommand) return;

    // Add a temporary loading state for slow commands (like text generation)
    const loadingId = `loading-${Date.now()}`;
    if (normalizedCommand.startsWith("say ")) {
      setHistory((currentHistory) => [
        ...currentHistory,
        {
          id: loadingId,
          input: command.trim(),
          output: "Processing...",
        },
      ]);
    }

    const result = await executeTerminalCommand(command, content.terminalSecrets);

    if (result.shouldClear) {
      setHistory([]);
    } else {
      setHistory((currentHistory) => {
        // Remove the temporary loading state and add the real result
        const filtered = currentHistory.filter((h) => h.id !== loadingId);
        return [
          ...filtered,
          {
            id: `${Date.now()}-${filtered.length}`,
            input: command.trim() || "(empty)",
            output: result.output,
            frames: result.frames,
          },
        ];
      });
    }

    if (normalizedCommand) {
      logger.info("[terminal] command executed", {
        command: normalizedCommand,
      });
    }

    if (result.output.startsWith("Unknown command:")) {
      logger.warn("[terminal] unknown command", {
        command: normalizedCommand || "(empty)",
      });
    }

    if (result.shouldClose) {
      closeWindow("terminal");
    }
  }

  return (
    <section className="space-y-5">
      <AppWindowHeader
        accentClassName="text-emerald-300/70"
        description=""
        eyebrow="Terminal"
        title="A small room for secrets, shortcuts, and hidden messages."
      />

      <TerminalHistory entries={history} />
      {history.length === 0 ? (
        <Panel className="px-4 py-3 text-sm leading-7 text-[color:rgba(244,235,208,0.64)]" tone="soft">
          Suggested commands: <span className="font-mono text-emerald-200">cat</span>,{" "}
          <span className="font-mono text-emerald-200">flower</span>,{" "}
          <span className="font-mono text-emerald-200">say I love you</span>,{" "}
          <span className="font-mono text-emerald-200">wave</span>,{" "}
          <span className="font-mono text-emerald-200">open letter</span>,{" "}
          <span className="font-mono text-emerald-200">show poem</span>,{" "}
          <span className="font-mono text-emerald-200">sudo love her</span>
        </Panel>
      ) : null}
      <TerminalInput onSubmit={handleSubmit} />
    </section>
  );
}