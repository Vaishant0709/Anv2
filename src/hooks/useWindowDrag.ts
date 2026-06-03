"use client";

import type { PanInfo } from "framer-motion";

import { logger } from "@/lib/logger";
import type { AppId } from "@/types/apps";
import type { WindowPosition } from "@/types/desktop";

interface UseWindowDragOptions {
  appId: AppId;
  initialPosition: WindowPosition;
  isMobile: boolean;
  onPositionChange: (position: WindowPosition) => void;
}

export function useWindowDrag({
  appId,
  initialPosition,
  isMobile,
  onPositionChange,
}: UseWindowDragOptions) {
  function handleDragStart() {
    if (isMobile) {
      return;
    }

    logger.info("[window] drag started", { appId });
  }

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (isMobile) {
      return;
    }

    const nextPosition = {
      x: Math.round(initialPosition.x + info.offset.x),
      y: Math.round(initialPosition.y + info.offset.y),
    };

    onPositionChange(nextPosition);
    logger.info("[window] drag ended", { appId, position: nextPosition });
  }

  return {
    drag: !isMobile,
    dragMomentum: false,
    dragListener: !isMobile,
    dragConstraints: false as const,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
  };
}
