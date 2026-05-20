"use client";

import { useEffect, useMemo, useState } from "react";

import { AppWindowHeader } from "@/components/ui/AppWindowHeader";
import { Panel } from "@/components/ui/Panel";
import { siteData } from "@/data/siteData";
import { validateSiteContent } from "@/lib/content";
import { logger } from "@/lib/logger";
import { buildReasonCardLayout } from "@/lib/reasonsLayout";
import type { ReasonCardEntry } from "@/types/content";

import { ReasonCard } from "./reasons/ReasonCard";

const content = validateSiteContent(siteData);
const accentCycle = ["amber", "mint", "rose"] as const;

export function ReasonsApp() {
  const [activeReasonId, setActiveReasonId] = useState<string | null>(content.reasons[0]?.id ?? null);
  const cards = useMemo(() => buildReasonCardLayout(content.reasons), []);

  useEffect(() => {
    logger.info("[reasons] app opened", {
      entries: content.reasons.length,
    });
  }, []);

  function handleInteract(reason: ReasonCardEntry, index: number) {
    setActiveReasonId((current) => (current === reason.id ? current : reason.id));
    logger.info("[reasons] card interacted", {
      id: reason.id,
      index,
      interaction: "focus",
    });
  }

  const activeReason = cards.find((card) => card.id === activeReasonId) ?? cards[0];

  return (
    <section className="space-y-6">
      <AppWindowHeader
        description="Every card comes from `siteData.reasons`, so this space stays easy to personalize while feeling a little playful and alive."
        eyebrow="Reasons.app"
        title="Little notes that still don't fully cover it."
      />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map((reason, index) => (
            <ReasonCard
              key={reason.id}
              accent={accentCycle[index % accentCycle.length]}
              index={index}
              isStacked={cards.length > 1}
              onInteract={handleInteract}
              reason={reason}
            />
          ))}
        </div>

        <Panel as="aside" className="p-6" tone="soft">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
            Current Highlight
          </p>
          <div className="mt-5 space-y-4">
            <p className="text-sm uppercase tracking-[0.22em] text-[color:rgba(244,235,208,0.54)]">
              {activeReason ? `Card ${cards.findIndex((card) => card.id === activeReason.id) + 1}` : "No Card"}
            </p>
            <p className="text-2xl font-semibold leading-9 text-[var(--color-foreground)]">
              {activeReason?.text ?? "Add a reason in siteData to see it here."}
            </p>
            <p className="text-sm leading-7 text-[color:rgba(244,235,208,0.7)]">
              Hover or drag a card to bring it into focus. The layout offsets are generated in a
              small helper so the component stays presentation-first.
            </p>
          </div>
        </Panel>
      </div>
    </section>
  );
}
