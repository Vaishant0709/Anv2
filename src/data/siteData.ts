import type { SiteContent } from "@/types/content";

export const siteData: SiteContent = {
  bootText: [
    "Initializing love.exe...",
    "Decrypting memories...",
    "Calibrating heart frequency...",
    "Enter passcode.",
  ],
  passwords: ["paris", "the coffee shop", "nickname"],
  desktopIcons: [
    { id: "memories", label: "Memories", icon: "FolderHeart" },
    { id: "reasons", label: "Reasons", icon: "Heart" },
    { id: "flower", label: "For You", icon: "Flower2" },
    { id: "audio", label: "Audio", icon: "Music4" },
    { id: "terminal", label: "Terminal", icon: "Terminal" },
  ],
  timeline: [
    {
      date: "Oct 12, 2022",
      title: "The First Date",
      description: "You wore that yellow dress and I forgot half the words I meant to say.",
      image: "/images/date1.jpg",
    },
    {
      date: "Feb 14, 2023",
      title: "The Long Walk Home",
      description: "We kept inventing reasons to not say goodbye just yet.",
      image: "/images/date2.jpg",
    },
  ],
  reasons: [
    { id: "reason-1", text: "You make ordinary days feel cinematic." },
    { id: "reason-2", text: "You remember the little things that matter." },
    { id: "reason-3", text: "You make me want to be gentler and braver." },
  ],
  flowerPoems: [
    "I love the way your laugh turns a room into home.",
    "I promise to keep choosing us in loud days and quiet ones.",
    "I still get a little nervous in the best way when I think of you.",
  ],
  terminalSecrets: {
    help: "Try: cat, flower, phool, whoami, ls, pwd, open letter, clear, sudo love her, exit",
    secrets: "There is a final letter hidden somewhere in this little universe.",
    ascii: "<3 <3 <3",
    "sudo love her":
      "Command executed successfully. Heart completely unlocked.",
  },
  audioTracks: [
    { id: "track-1", title: "Voice Note 01", src: "/audio/voice-note-01.mp3" },
  ],
  pinnedNote: {
    title: "Pinned Note",
    body: "Just a little world I built for you. Start with Memories, then try the Terminal later.",
    signature: "Love, Yours",
  },
};
