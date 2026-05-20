import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  isValidIconName,
  normalizeSiteContent,
  sortTimelineEntries,
  validateSiteContent,
} from "@/lib/content";
import type { SiteContent } from "@/types/content";

const baseContent: SiteContent = {
  bootText: [" One ", " Two "],
  passwords: [" Paris "],
  desktopIcons: [{ id: "memories", label: "Memories", icon: "FolderHeart" }],
  timeline: [
    {
      date: "Feb 14, 2023",
      title: "Second",
      description: " B ",
      image: "/b.jpg",
    },
    {
      date: "Oct 12, 2022",
      title: "First",
      description: " A ",
      image: "/a.jpg",
    },
  ],
  reasons: [{ id: "reason-1", text: " You " }],
  flowerPoems: [" Promise "],
  terminalSecrets: { help: "Help" },
  audioTracks: [{ id: "track-1", title: " Track ", src: " /audio/test.mp3 " }],
};

describe("content helpers", () => {
  it("sorts timeline entries by ascending date", () => {
    const sorted = sortTimelineEntries(baseContent.timeline);

    assert.deepEqual(
      sorted.map((entry) => entry.title),
      ["First", "Second"],
    );
  });

  it("validates icon names", () => {
    assert.equal(isValidIconName("FolderHeart"), true);
    assert.equal(isValidIconName("Nope"), false);
  });

  it("normalizes site content values", () => {
    const normalized = normalizeSiteContent(baseContent);

    assert.deepEqual(normalized.bootText, ["One", "Two"]);
    assert.deepEqual(normalized.passwords, ["paris"]);
    assert.deepEqual(
      normalized.timeline.map((entry) => entry.title),
      ["First", "Second"],
    );
    assert.deepEqual(normalized.reasons[0], { id: "reason-1", text: "You" });
    assert.deepEqual(normalized.audioTracks[0], {
      id: "track-1",
      title: "Track",
      src: "/audio/test.mp3",
    });
  });

  it("filters invalid records and falls back for missing content", () => {
    const validated = validateSiteContent({
      ...baseContent,
      desktopIcons: [
        { id: "memories", label: "Memories", icon: "FolderHeart" },
        { id: "memories", label: "", icon: "FolderHeart" },
      ],
      reasons: [{ id: "", text: "Ignored" }],
      terminalSecrets: { " ": "ignored", valid: "ok" },
    });

    assert.equal(validated.desktopIcons.length, 1);
    assert.equal(validated.reasons.length, 0);
    assert.deepEqual(validated.terminalSecrets, { valid: "ok" });
    assert.deepEqual(validateSiteContent(undefined).bootText, [
      "Initializing love.exe...",
      "Enter passcode.",
    ]);
  });
});
