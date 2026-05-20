"use client";

import type { ReactNode } from "react";

import { AudioBootstrap } from "@/components/audio/AudioBootstrap";
import { DesktopProvider } from "@/context/DesktopContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <DesktopProvider>
      <AudioBootstrap />
      {children}
    </DesktopProvider>
  );
}
