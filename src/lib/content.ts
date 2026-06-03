import { APP_IDS, type AppIconName } from "@/types/apps";
import { logger } from "@/lib/logger";
import type {
  CelebrationContent,
  AudioTrack,
  PinnedNote,
  ReasonCardEntry,
  SiteContent,
  TimelineEntry,
} from "@/types/content";

const APP_ID_SET = new Set(APP_IDS);
const APP_ICON_NAMES: ReadonlySet<AppIconName> = new Set([
  "FolderHeart",
  "Heart",
  "Flower2",
  "Music4",
  "Terminal",
]);

const FALLBACK_CONTENT: SiteContent = {
  bootText: ["Initializing love.exe...", "Enter passcode."],
  passwords: [],
  desktopIcons: [],
  timeline: [],
  reasons: [],
  flowerPoems: [],
  terminalSecrets: {},
  audioTracks: [],
  pinnedNote: {
    title: "Pinned Note",
    body: "Add a little note in siteData to personalize this desktop.",
    signature: "Love",
  },
  celebration: {
    headline: "Happy Anniversary Aru",
    message: "Tap once and let the whole desktop celebrate you.",
    resultLine: "Aru, you're my favorite forever.",
  },
};

function normalizeText(value: string) {
  return value.trim();
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeTimelineEntry(entry: TimelineEntry): TimelineEntry {
  return {
    ...entry,
    date: isNonEmptyString(entry.date) ? normalizeText(entry.date) : undefined,
    title: normalizeText(entry.title),
    description: normalizeText(entry.description),
    image: normalizeText(entry.image),
  };
}

function normalizeReasonEntry(entry: ReasonCardEntry): ReasonCardEntry {
  return {
    id: normalizeText(entry.id),
    text: normalizeText(entry.text),
  };
}

function normalizeAudioTrack(track: AudioTrack): AudioTrack {
  return {
    id: normalizeText(track.id),
    title: normalizeText(track.title),
    src: normalizeText(track.src),
  };
}

function normalizePinnedNote(note: PinnedNote): PinnedNote {
  return {
    title: normalizeText(note.title),
    body: normalizeText(note.body),
    signature: normalizeText(note.signature),
  };
}

function normalizeCelebrationContent(content: CelebrationContent): CelebrationContent {
  return {
    headline: normalizeText(content.headline),
    message: normalizeText(content.message),
    resultLine: normalizeText(content.resultLine),
  };
}

function getTimeValue(date: string) {
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

export function sortTimelineEntries(entries: TimelineEntry[]) {
  return [...entries].sort((left, right) => {
    return getTimeValue(left.date ?? "") - getTimeValue(right.date ?? "");
  });
}

export function isValidIconName(icon: string): icon is AppIconName {
  return APP_ICON_NAMES.has(icon as AppIconName);
}

export function normalizeSiteContent(content: SiteContent): SiteContent {
  return {
    bootText: content.bootText.map(normalizeText).filter(Boolean),
    passwords: content.passwords.map((password) => password.trim().toLowerCase()).filter(Boolean),
    desktopIcons: content.desktopIcons.filter((icon) => {
      const isValidId = APP_ID_SET.has(icon.id);
      const isValidIcon = isValidIconName(icon.icon);

      if (!isValidId || !isValidIcon) {
        logger.warn("[content] invalid desktop icon removed", {
          id: icon.id,
          icon: icon.icon,
        });
        return false;
      }

      return isNonEmptyString(icon.label);
    }),
    timeline: sortTimelineEntries(
      content.timeline
        .filter((entry) => {
          const isValid =
            isNonEmptyString(entry.title) &&
            isNonEmptyString(entry.description) &&
            isNonEmptyString(entry.image);

          if (!isValid) {
            logger.warn("[content] invalid timeline entry removed", {
              title: entry.title,
            });
          }

          return isValid;
        })
        .map(normalizeTimelineEntry),
    ),
    reasons: content.reasons
      .filter((entry) => {
        const isValid = isNonEmptyString(entry.id) && isNonEmptyString(entry.text);

        if (!isValid) {
          logger.warn("[content] invalid reason entry removed");
        }

        return isValid;
      })
      .map(normalizeReasonEntry),
    flowerPoems: content.flowerPoems.map(normalizeText).filter(Boolean),
    terminalSecrets: Object.fromEntries(
      Object.entries(content.terminalSecrets).filter(([command, response]) => {
        const isValid = isNonEmptyString(command) && isNonEmptyString(response);

        if (!isValid) {
          logger.warn("[content] invalid terminal secret removed", {
            command,
          });
        }

        return isValid;
      }),
    ),
    audioTracks: content.audioTracks
      .filter((track) => {
        const isValid =
          isNonEmptyString(track.id) &&
          isNonEmptyString(track.title) &&
          isNonEmptyString(track.src);

        if (!isValid) {
          logger.warn("[content] invalid audio track removed", {
            id: track.id,
          });
        }

        return isValid;
      })
      .map(normalizeAudioTrack),
    pinnedNote:
      isNonEmptyString(content.pinnedNote.title) &&
      isNonEmptyString(content.pinnedNote.body) &&
      isNonEmptyString(content.pinnedNote.signature)
        ? normalizePinnedNote(content.pinnedNote)
        : (() => {
            logger.warn("[content] invalid pinned note, using fallback");
            return FALLBACK_CONTENT.pinnedNote;
          })(),
    celebration:
      isNonEmptyString(content.celebration.headline) &&
      isNonEmptyString(content.celebration.message) &&
      isNonEmptyString(content.celebration.resultLine)
        ? normalizeCelebrationContent(content.celebration)
        : (() => {
            logger.warn("[content] invalid celebration content, using fallback");
            return FALLBACK_CONTENT.celebration;
          })(),
  };
}

export function validateSiteContent(content: Partial<SiteContent> | undefined): SiteContent {
  if (!content) {
    logger.warn("[content] missing site content, using fallback");
    return FALLBACK_CONTENT;
  }

  return normalizeSiteContent({
    ...FALLBACK_CONTENT,
    ...content,
    bootText: Array.isArray(content.bootText) ? content.bootText : FALLBACK_CONTENT.bootText,
    passwords: Array.isArray(content.passwords)
      ? content.passwords
      : FALLBACK_CONTENT.passwords,
    desktopIcons: Array.isArray(content.desktopIcons)
      ? content.desktopIcons
      : FALLBACK_CONTENT.desktopIcons,
    timeline: Array.isArray(content.timeline) ? content.timeline : FALLBACK_CONTENT.timeline,
    reasons: Array.isArray(content.reasons) ? content.reasons : FALLBACK_CONTENT.reasons,
    flowerPoems: Array.isArray(content.flowerPoems)
      ? content.flowerPoems
      : FALLBACK_CONTENT.flowerPoems,
    terminalSecrets:
      content.terminalSecrets && typeof content.terminalSecrets === "object"
        ? content.terminalSecrets
        : FALLBACK_CONTENT.terminalSecrets,
    audioTracks: Array.isArray(content.audioTracks)
      ? content.audioTracks
      : FALLBACK_CONTENT.audioTracks,
    pinnedNote:
      content.pinnedNote && typeof content.pinnedNote === "object"
        ? content.pinnedNote
        : FALLBACK_CONTENT.pinnedNote,
    celebration:
      content.celebration && typeof content.celebration === "object"
        ? content.celebration
        : FALLBACK_CONTENT.celebration,
  });
}
