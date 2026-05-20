"use client";

import { motion } from "framer-motion";

import { useDesktop } from "@/context/DesktopContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useWindowDrag } from "@/hooks/useWindowDrag";
import { windowMotion } from "@/lib/motion";
import type { DesktopWindow } from "@/types/desktop";

import { WindowFrame } from "./WindowFrame";

interface DraggableWindowProps {
  children: React.ReactNode;
  window: DesktopWindow;
}

export function DraggableWindow({ children, window }: DraggableWindowProps) {
  const { closeWindow, focusWindow, setWindowPosition } = useDesktop();
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const viewport = useWindowDimensions();

  const dragProps = useWindowDrag({
    appId: window.id,
    initialPosition: window.position,
    isMobile,
    onPositionChange: (position) => {
      setWindowPosition(window.id, position);
    },
  });

  const width = isMobile
    ? Math.max(viewport.width - 24, 0)
    : window.size?.width ?? 720;
  const height = isMobile
    ? Math.max(viewport.height - 24, 0)
    : window.size?.height ?? 520;
  const motionProps = prefersReducedMotion
    ? {
        animate: {
          opacity: 1,
          x: isMobile ? 0 : window.position.x,
          y: isMobile ? 0 : window.position.y,
        },
        exit: { opacity: 0 },
        initial: {
          opacity: 1,
          x: isMobile ? 0 : window.position.x,
          y: isMobile ? 0 : window.position.y,
        },
        transition: { duration: 0 },
      }
    : {
        animate: {
          ...windowMotion.animate,
          x: isMobile ? 0 : window.position.x,
          y: isMobile ? 0 : window.position.y,
        },
        exit: windowMotion.exit,
        initial: {
          ...windowMotion.initial,
          x: isMobile ? 0 : window.position.x,
          y: isMobile ? 0 : window.position.y + 16,
        },
        transition: windowMotion.transition,
      };

  return (
    <motion.div
      animate={motionProps.animate}
      aria-label={window.title}
      className="absolute"
      exit={motionProps.exit}
      initial={motionProps.initial}
      onMouseDown={() => {
        focusWindow(window.id);
      }}
      onTouchStart={() => {
        focusWindow(window.id);
      }}
      role="dialog"
      style={{
        zIndex: window.zIndex,
        width,
        height,
        left: isMobile ? 12 : 0,
        top: isMobile ? 12 : 0,
        maxWidth: isMobile ? "calc(100vw - 24px)" : undefined,
        maxHeight: isMobile ? "calc(100vh - 24px)" : undefined,
      }}
      transition={motionProps.transition}
      {...dragProps}
    >
      <WindowFrame
        isMobile={isMobile}
        onClose={() => {
          closeWindow(window.id);
        }}
        title={window.title}
      >
        {children}
      </WindowFrame>
    </motion.div>
  );
}
