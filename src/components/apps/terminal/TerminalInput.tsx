"use client";

import { useState } from "react";

interface TerminalInputProps {
  onSubmit: (command: string) => void;
}

export function TerminalInput({ onSubmit }: TerminalInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  }

  return (
    <form
      className="flex items-center gap-3 rounded-[20px] border border-emerald-200/10 bg-black/50 px-4 py-3 font-mono"
      onSubmit={handleSubmit}
    >
      <span className="text-sm text-emerald-300/70">$</span>
      <input
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className="w-full bg-transparent text-sm text-emerald-100 outline-none placeholder:text-emerald-100/35"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type a secret command..."
        spellCheck={false}
        type="text"
        value={value}
      />
    </form>
  );
}
