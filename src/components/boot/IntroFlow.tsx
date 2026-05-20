"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { siteData } from "@/data/siteData";
import { useDesktop } from "@/context/DesktopContext";
import { validateSiteContent } from "@/lib/content";
import { logger } from "@/lib/logger";

import { AuthGate } from "./AuthGate";
import { BootScreen } from "./BootScreen";

const content = validateSiteContent(siteData);

export function IntroFlow() {
  const { authenticate } = useDesktop();
  const [stage, setStage] = useState<"boot" | "auth">("boot");

  function handleBootComplete() {
    logger.info("[boot] transitioned to auth gate");
    setStage("auth");
  }

  function handleAuthSuccess() {
    authenticate();
  }

  return (
    <AnimatePresence mode="wait">
      {stage === "boot" ? (
        <BootScreen key="boot" lines={content.bootText} onComplete={handleBootComplete} />
      ) : (
        <AuthGate
          key="auth"
          acceptedAnswers={content.passwords}
          onSuccess={handleAuthSuccess}
        />
      )}
    </AnimatePresence>
  );
}
