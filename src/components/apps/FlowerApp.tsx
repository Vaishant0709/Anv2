"use client";

import { useEffect, useMemo, useState } from "react";

import { AppWindowHeader } from "@/components/ui/AppWindowHeader";
import { Panel } from "@/components/ui/Panel";
import { siteData } from "@/data/siteData";
import {
  areAllPetalsPlucked,
  createFlowerPetals,
  getInitialRevealedPoem,
  getNextRevealedPoem,
  pluckFlowerPetal,
} from "@/lib/flower";
import { validateSiteContent } from "@/lib/content";
import { logger } from "@/lib/logger";

import { FlowerCanvas } from "./flower/FlowerCanvas";
import { PoemReveal } from "./flower/PoemReveal";

const content = validateSiteContent(siteData);

export function FlowerApp() {
  const initialPetals = useMemo(() => createFlowerPetals(content.flowerPoems), []);
  const [petals, setPetals] = useState(initialPetals);
  const [revealedPoem, setRevealedPoem] = useState<string | null>(
    getInitialRevealedPoem(initialPetals),
  );

  useEffect(() => {
    logger.info("[flower] app opened", {
      petals: initialPetals.length,
    });
  }, [initialPetals.length]);

  const allPlucked = areAllPetalsPlucked(petals);

  function handlePluck(petalId: string) {
    const targetPetal = petals.find((petal) => petal.id === petalId);

    if (!targetPetal || targetPetal.isPlucked) {
      return;
    }

    const nextPoem = getNextRevealedPoem(petals, petalId);
    const nextPetals = pluckFlowerPetal(petals, petalId);

    setPetals(nextPetals);
    setRevealedPoem(nextPoem);

    logger.info("[flower] petal clicked", {
      petalId,
    });

    if (nextPoem) {
      logger.info("[flower] poem revealed", {
        petalId,
      });
    }

    if (areAllPetalsPlucked(nextPetals)) {
      logger.info("[flower] all petals exhausted");
    }
  }

  return (
    <section className="space-y-6">
      <AppWindowHeader
        description="Click each petal to pull it away and uncover a note."
        eyebrow="Flower.sh"
        title="A flower made of tiny promises."
      />

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <FlowerCanvas onPluck={handlePluck} petals={petals} />
        {petals.length === 0 ? (
          <Panel className="p-6 text-sm leading-7 text-[color:rgba(244,235,208,0.72)]" tone="soft">
            No petals are configured yet. Add entries to <span className="font-mono">siteData.flowerPoems</span> to bring this flower to life.
          </Panel>
        ) : (
          <PoemReveal allPlucked={allPlucked} poem={revealedPoem} />
        )}
      </div>
    </section>
  );
}
