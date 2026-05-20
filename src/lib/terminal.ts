import type { TerminalSecrets } from "@/types/content";

export interface TerminalAnimationFrame {
  text: string;
}

export interface TerminalHistoryEntry {
  id: string;
  input: string;
  output: string;
  frames?: TerminalAnimationFrame[];
}

export interface TerminalCommandResult {
  output: string;
  frames?: TerminalAnimationFrame[];
  shouldClear?: boolean;
  shouldClose: boolean;
}

const CAT_FRAMES: TerminalAnimationFrame[] = [
  {
    text: " /\\_/\\\\\n( o.o )\n > ^ <",
  },
  {
    text: " /\\_/\\\\\n( -.- )\n > ^ <",
  },
  {
    text: " /\\_/\\\\\n( o.o )\n >>^<<",
  },
];

const FLOWER_FRAMES: TerminalAnimationFrame[] = [
  {
    text: "   .-.\n  /   \\\n |  .  |\n  \\   /\n   \\|/\n    |\n   / \\",
  },
  {
    text: "   \\|/\n  --*--\n   /|\\\\\n    |\n    |\n   / \\",
  },
  {
    text: "   .-.\n \\ ( ) /\n  ( * )\n /  |  \\\n    |\n   / \\",
  },
];

const DIRECTORY_LIST = `memories/
reasons/
flower/
audio/
terminal/
future-plans.txt
love-letter.txt`;

const LOVE_LETTER = `You found the quiet room behind the desktop.

If this little world feels handmade, that's because it is.
Every window here was built to hold a version of us:
our days, our jokes, our future promises, and all the small things I never want to lose.

Thank you for being the best thing my heart ever kept open.`;

function normalizeCommand(command: string) {
  return command.trim().toLowerCase().replace(/\s+/g, " ");
}

export function executeTerminalCommand(
  input: string,
  terminalSecrets: TerminalSecrets,
): TerminalCommandResult {
  const command = normalizeCommand(input);

  if (!command) {
    return {
      output: "Type a command first. Try `help` to get started.",
      shouldClose: false,
    };
  }

  switch (command) {
    case "help":
      return {
        output:
          terminalSecrets.help ??
          "Try: cat, flower, phool, whoami, ls, pwd, open letter, clear, exit",
        shouldClose: false,
      };
    case "cat":
      return {
        output: "Summoning terminal cat...",
        frames: CAT_FRAMES,
        shouldClose: false,
      };
    case "flower":
    case "phool":
      return {
        output: "Growing something soft...",
        frames: FLOWER_FRAMES,
        shouldClose: false,
      };
    case "whoami":
      return {
        output: "your favorite person",
        shouldClose: false,
      };
    case "ls":
      return {
        output: DIRECTORY_LIST,
        shouldClose: false,
      };
    case "pwd":
      return {
        output: "/heart/memories/us",
        shouldClose: false,
      };
    case "love":
      return {
        output: "SYSTEM STATUS: hopelessly in love",
        shouldClose: false,
      };
    case "open letter":
      return {
        output: LOVE_LETTER,
        shouldClose: false,
      };
    case "clear":
      return {
        output: "Terminal cleared.",
        shouldClear: true,
        shouldClose: false,
      };
    case "exit":
      return {
        output: "Closing terminal window...",
        shouldClose: true,
      };
    default:
      if (terminalSecrets[command]) {
        return {
          output: terminalSecrets[command],
          shouldClose: false,
        };
      }

      return {
        output: `Unknown command: ${command}. Try \`help\`.`,
        shouldClose: false,
      };
  }
}
