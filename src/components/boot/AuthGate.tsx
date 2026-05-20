"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Panel } from "@/components/ui/Panel";
import { validatePasswordAttempt } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { fadeInUp } from "@/lib/motion";

interface AuthGateProps {
  acceptedAnswers: string[];
  onSuccess: () => void;
}

export function AuthGate({ acceptedAnswers, onSuccess }: AuthGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    logger.info("[auth] attempt submitted", {
      inputLength: value.trim().length,
    });

    const isValid = validatePasswordAttempt(value, acceptedAnswers);

    if (!isValid) {
      setError("Not quite. Try the answer your heart remembers first.");
      return;
    }

    setError(null);
    onSuccess();
  }

  return (
    <motion.section
      animate={fadeInUp.animate}
      className="relative flex min-h-screen items-center justify-center px-6 py-10"
      exit={fadeInUp.exit}
      initial={fadeInUp.initial}
      transition={fadeInUp.transition}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(131,197,190,0.15),transparent_28%),linear-gradient(180deg,#081120_0%,#050b14_100%)]" />

      <Panel className="relative w-full max-w-xl rounded-[32px] p-8 sm:p-10" tone="surface">
        <p className="mb-3 text-sm uppercase tracking-[0.32em] text-[var(--color-accent-soft)]">
          Access Gate
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
          Where did we first meet?
        </h1>
        <p className="mt-3 text-base leading-7 text-[color:rgba(244,235,208,0.78)]">
          A tiny password gate before the rest of the story opens.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm uppercase tracking-[0.24em] text-[var(--color-accent)]" htmlFor="answer">
            Passcode
          </label>
          <Input
            autoComplete="off"
            id="answer"
            onChange={(event) => setValue(event.target.value)}
            placeholder="Type your answer here..."
            type="text"
            value={value}
          />

          {error ? (
            <p className="text-sm text-rose-200/90">{error}</p>
          ) : (
            <p className="text-sm text-[color:rgba(244,235,208,0.58)]">
              Matching is forgiving about case and small typos.
            </p>
          )}

          <Button type="submit">
            Unlock
          </Button>
        </form>
      </Panel>
    </motion.section>
  );
}
