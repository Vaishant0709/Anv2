"use client";

import type { FlowerPetalState } from "@/lib/flower";

import { FlowerPetal } from "./FlowerPetal";

interface FlowerCanvasProps {
  onPluck: (petalId: string) => void;
  petals: FlowerPetalState[];
}

export function FlowerCanvas({ onPluck, petals }: FlowerCanvasProps) {
  return (
    <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-6 py-10">
      <div className="absolute inset-x-1/2 top-1/2 h-44 w-2 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#7ac27c,#2f7b4d)] shadow-[0_0_18px_rgba(122,194,124,0.25)]" />
      <div className="absolute left-1/2 top-[63%] h-16 w-24 -translate-x-[88%] rotate-[-26deg] rounded-[100%_0_100%_0] bg-[linear-gradient(180deg,#7ac27c,#34794b)] opacity-90" />
      <div className="absolute left-1/2 top-[70%] h-16 w-24 translate-x-[-4%] rotate-[22deg] rounded-[0_100%_0_100%] bg-[linear-gradient(180deg,#7ac27c,#34794b)] opacity-90" />

      <div className="relative h-72 w-72">
        {petals.map((petal, index) => (
          <FlowerPetal
            key={petal.id}
            index={index}
            onPluck={onPluck}
            petal={petal}
            total={petals.length}
          />
        ))}

        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-100/20 bg-[radial-gradient(circle_at_35%_35%,#fff2b8,transparent_26%),radial-gradient(circle,#f1b94d,#b4711f)] shadow-[0_18px_32px_rgba(0,0,0,0.24)]" />
      </div>
    </div>
  );
}
