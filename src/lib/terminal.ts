import type { TerminalSecrets } from "@/types/content";
import { generateProceduralWave } from "./procedural-ascii";

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
    text: "      .-.\n   .-(   )-.\n  (   \\ /   )\n   '-. | .-'\n      \\|/\n       |\n      / \\\n     /   \\",
  },
  {
    text: "      \\|/\n   .-- * --.\n  (    |    )\n   '-. | .-'\n      \\|/\n       |\n      / \\\n     /   \\",
  },
  {
    text: "      .-.\n   .-( * )-.\n  (   /|\\   )\n   '-. | .-'\n      /|\\\n       |\n      / \\\n     /   \\",
  },
];

const HEART_FRAMES: TerminalAnimationFrame[] = [
  {
    text: "   ** **\n * * *\n* * * *\n* \\_/    *\n * / \\   *\n   ** **",
  },
  {
    text: "   ** **\n * ** ** *\n* * * * *\n* \\_/    *\n * / \\   *\n   ** **",
  },
  {
    text: "   ** **\n * *** *\n* ** ** *\n* \\_/    *\n * / \\   *\n   ** **",
  },
];

const ROSE_FRAMES: TerminalAnimationFrame[] = [
  {
    text: "      .-.\n    .'   '.\n   /  .-.  \\\n  |  /   \\  |\n  |  \\   /  |\n   \\  '-'  /\n    '.___.'\n       |\n      / \\\n     /___\\",
  },
  {
    text: "      .-.\n    .' . '.\n   /  / \\  \\\n  |  /   \\  |\n  |  \\_._/  |\n   \\  '-'  /\n    '.___.'\n       |\n      / \\\n     /___\\",
  },
  {
    text: "      .-.\n    .' o '.\n   /  /_\\  \\\n  |  /   \\  |\n  |  \\   /  |\n   \\  '-'  /\n    '.___.'\n       |\n      / \\\n     /___\\",
  },
];

const GARDEN_FRAMES: TerminalAnimationFrame[] = [
  {
    text: "  . . . . .\n .  * * .\n.  * ^  * .\n .  * /|\\ * .\n  .   / \\   .\n   . . . . .",
  },
  {
    text: "  . . . . .\n .  * * .\n.  * ^  * .\n .  * /|\\ * .\n  .  _/ \\_  .\n   . . . . .",
  },
  {
    text: "  . . . . .\n .  * * .\n.  * ^  * .\n .  * /|\\ * .\n  .   / \\   .\n   . . . . .",
  },
];

const LOVE_LETTER = `You found the quiet room behind the desktop.

If this little world feels handmade, that's because it is.
Every window here was built to hold a version of us:
our days, our jokes, our future promises, and all the small things I never want to lose.

Thank you for being the best thing my heart ever kept open.`;

const GALLERY = `memories/
reasons/
flower/
audio/
terminal/
future-plans.txt
love-letter.txt
garden.ansi
heartbeat.txt
moonlight.log`;

const SHELL_POEM = `We are
different shades of the same blue.

You are the blue of the deep ocean,
intense and beautifully dangerous,
the kind that holds so many thoughts
and hides storms beneath its calm.
I am the blue of the evening sky,
soft and forgiving,
the one that touches windows gently,
making the world exhale slowly.
You find calm in my blue,
while I want to drown in yours.
I hold endless stars,
while you reflect them steadily.

When the horizon folds the sky into the sea,
no one can really tell where you end
and I begin.
Maybe that's the strange mercy of love,
even our differences are meant
to belong together.`;

function normalizeCommand(command: string) {
  return command.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function executeTerminalCommand(
  input: string,
  terminalSecrets: TerminalSecrets,
): Promise<TerminalCommandResult> {
  const command = normalizeCommand(input);

  if (!command) {
    return {
      output: "Type a command first. Try `help` to get started.",
      shouldClose: false,
    };
  }

  // 2. Dynamic Text Banner (Figlet via API)
  if (command.startsWith("say ")) {
    const text = input.slice(4).trim();
    if (!text) {
      return {
        output: "Please provide text to display. Example: say I love you",
        shouldClose: false,
      };
    }
    try {
      const response = await fetch(`/api/say?text=${encodeURIComponent(text)}`);
      if (!response.ok) {
        const error = await response.json();
        return {
          output: `Error: ${error.error || "Failed to generate banner"}`,
          shouldClose: false,
        };
      }
      const data = await response.json();
      return { output: data.banner, shouldClose: false };
    } catch (error) {
      return {
        output: "Failed to generate banner. Please try again.",
        shouldClose: false,
      };
    }
  }

  switch (command) {
    case "help":
      return {
        output:
          terminalSecrets.help ??
          "Try: cat, kitty, neko, flower, phool, rose, heart, garden, wave, say <text>, whoami, ls, pwd, open letter, show poem, clear, exit",
        shouldClose: false,
      };
    case "cat":
      return {
        output: "A cat appears in the quiet room...",
        frames: CAT_FRAMES,
        shouldClose: false,
      };
    case "kitty":
    case "neko":
      return {
        output: "A softer cat appears...",
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
    case "rose":
      return {
        output: "A rose opens slowly...",
        frames: ROSE_FRAMES,
        shouldClose: false,
      };
    case "heart":
    case "loveheart":
      return {
        output: "A small heart begins to glow...",
        frames: HEART_FRAMES,
        shouldClose: false,
      };
    case "garden":
      return {
        output: "A tiny terminal garden grows quietly...",
        frames: GARDEN_FRAMES,
        shouldClose: false,
      };
    case "wave":
      return {
        output: "Generating a procedural mathematical wave...",
        frames: generateProceduralWave(50),
        shouldClose: false,
      };
    case "whoami":
      return {
        output: "your favorite person",
        shouldClose: false,
      };
    case "ls":
      return {
        output: GALLERY,
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
    case "show poem":
      return {
        output: SHELL_POEM,
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