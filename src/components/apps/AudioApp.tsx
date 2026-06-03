"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";

import { AppWindowHeader } from "@/components/ui/AppWindowHeader";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { siteData } from "@/data/siteData";
import { validateSiteContent } from "@/lib/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { logger } from "@/lib/logger";
import { useGlobalAudio } from "@/hooks/useGlobalAudio";

const content = validateSiteContent(siteData);

export function AudioApp() {
  const [selectedTrackId, setSelectedTrackId] = useState(content.audioTracks[0]?.id ?? null);
  const selectedTrack = useMemo(
    () => content.audioTracks.find((track) => track.id === selectedTrackId) ?? content.audioTracks[0] ?? null,
    [selectedTrackId],
  );
  const { currentTrack, hasUnlocked, isPlaying, toggle } = useGlobalAudio();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    logger.info("[audio] app opened", {
      tracks: content.audioTracks.length,
    });
  }, []);

  return (
    <section className="space-y-6">
      <AppWindowHeader
        description="Playback is powered by a shared global audio controller, so the music can continue even while you explore other windows."
        eyebrow="Audio.mp3"
        title="A little player for voice notes and quiet loops."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <Panel className="rounded-[30px] p-6" tone="soft">
          <div className="mx-auto flex h-56 w-full max-w-sm items-center justify-center rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.18),transparent_18%),linear-gradient(180deg,#1a2334,#0d1421)]">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle,#161f30,#080d16)] shadow-[inset_0_0_0_12px_rgba(255,255,255,0.03)]">
              <div className="h-16 w-16 rounded-full border border-[rgba(245,185,113,0.35)] bg-[radial-gradient(circle,#f5b971,#9b6728)]" />
              <div
                className="absolute h-2 w-24 rounded-full bg-[linear-gradient(90deg,#d7dbe1,#79808f)]"
                style={{
                  transform: prefersReducedMotion
                    ? "rotate(-18deg)"
                    : `rotate(${isPlaying ? -6 : -18}deg)`,
                  transition: "transform 240ms ease-out",
                }}
              />
            </div>
          </div>
        </Panel>

        <Panel as="aside" className="rounded-[30px] p-6" tone="soft">
          <div className="flex items-center gap-3 text-[var(--color-accent)]">
            <Volume2 className="h-5 w-5" />
            <p className="text-xs uppercase tracking-[0.28em]">Now Playing</p>
          </div>

          <div className="mt-5 space-y-3">
            <p className="text-2xl font-semibold text-[var(--color-foreground)]">
              {selectedTrack?.title ?? "Add an audio track"}
            </p>
            
          </div>

          <div className="mt-7 space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">
              Tracks
            </p>
            <div className="space-y-2">
              {content.audioTracks.map((track) => {
                const isSelected = track.id === selectedTrack?.id;

                return (
                  <button
                    key={track.id}
                    className={`flex w-full items-center justify-between rounded-[20px] border px-4 py-3 text-left transition ${
                      isSelected
                        ? "border-[rgba(245,185,113,0.28)] bg-[rgba(245,185,113,0.12)]"
                        : "border-white/10 bg-white/5 hover:bg-white/8"
                    }`}
                    onClick={() => {
                      setSelectedTrackId(track.id);
                    }}
                    type="button"
                  >
                    <span className="text-sm font-medium text-[var(--color-foreground)]">
                      {track.title}
                    </span>
                    <span className="text-xs uppercase tracking-[0.22em] text-[color:rgba(244,235,208,0.56)]">
                      {isSelected ? "Selected" : "Choose"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            className="mt-8 gap-3"
            disabled={!selectedTrack}
            onClick={() => {
              if (selectedTrack) {
                toggle(selectedTrack);
              }
            }}
          >
            {isPlaying && currentTrack?.id === selectedTrack?.id ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isPlaying && currentTrack?.id === selectedTrack?.id ? "Pause" : "Play"}
          </Button>
        </Panel>
      </div>
    </section>
  );
}
