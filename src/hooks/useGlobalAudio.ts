"use client";

import { useEffect, useState } from "react";

import { logger } from "@/lib/logger";
import type { AudioTrack } from "@/types/content";

interface AudioStoreState {
  currentTrack: AudioTrack | null;
  hasUnlocked: boolean;
  isPlaying: boolean;
}

type AudioListener = (state: AudioStoreState) => void;

const audioStore = {
  audio: null as HTMLAudioElement | null,
  listeners: new Set<AudioListener>(),
  state: {
    currentTrack: null,
    hasUnlocked: false,
    isPlaying: false,
  } as AudioStoreState,
};

function emitAudioState() {
  audioStore.listeners.forEach((listener) => listener(audioStore.state));
}

function ensureAudio() {
  if (audioStore.audio) {
    return audioStore.audio;
  }

  audioStore.audio = new Audio();
  audioStore.audio.loop = true;
  audioStore.audio.volume = 0.55;
  audioStore.audio.addEventListener("play", () => {
    audioStore.state = {
      ...audioStore.state,
      isPlaying: true,
    };
    emitAudioState();
  });
  audioStore.audio.addEventListener("pause", () => {
    audioStore.state = {
      ...audioStore.state,
      isPlaying: false,
    };
    emitAudioState();
  });
  audioStore.audio.addEventListener("error", () => {
    logger.error("[audio] load failed", {
      src: audioStore.audio?.src,
    });
  });

  logger.info("[audio] initialized");

  return audioStore.audio;
}

async function playTrack(track: AudioTrack) {
  const audio = ensureAudio();

  if (audio.src !== track.src) {
    audio.src = track.src;
    audioStore.state = {
      ...audioStore.state,
      currentTrack: track,
    };
  }

  try {
    await audio.play();
    logger.info("[audio] playback started", {
      trackId: track.id,
    });
  } catch (error) {
    logger.warn("[audio] playback blocked", {
      trackId: track.id,
      error: error instanceof Error ? error.message : "unknown-error",
    });
  }

  emitAudioState();
}

function pausePlayback() {
  if (!audioStore.audio) {
    return;
  }

  audioStore.audio.pause();
  logger.info("[audio] playback paused", {
    trackId: audioStore.state.currentTrack?.id ?? null,
  });
}

export function unlockAudio(track: AudioTrack | null) {
  if (!track) {
    return;
  }

  audioStore.state = {
    ...audioStore.state,
    hasUnlocked: true,
    currentTrack: track,
  };
  ensureAudio();
  emitAudioState();
}

export function useGlobalAudio() {
  const [state, setState] = useState<AudioStoreState>(audioStore.state);

  useEffect(() => {
    const listener: AudioListener = (nextState) => {
      setState(nextState);
    };

    audioStore.listeners.add(listener);
    return () => {
      audioStore.listeners.delete(listener);
    };
  }, []);

  return {
    ...state,
    pause: pausePlayback,
    play: (track: AudioTrack) => {
      audioStore.state = {
        ...audioStore.state,
        hasUnlocked: true,
        currentTrack: track,
      };
      void playTrack(track);
    },
    toggle: (track: AudioTrack) => {
      if (audioStore.state.isPlaying) {
        pausePlayback();
        return;
      }

      audioStore.state = {
        ...audioStore.state,
        hasUnlocked: true,
        currentTrack: track,
      };
      void playTrack(track);
    },
  };
}
