"use client";

import type { FlowerPetalState } from "@/lib/flower";

import { FlowerPetal } from "./FlowerPetal";

interface FlowerCanvasProps {
  onPluck: (petalId: string) => void;
  petals: FlowerPetalState[];
}

export function FlowerCanvas({ onPluck, petals }: FlowerCanvasProps) {
  return (
    <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_34%),radial-gradient(circle_at_center,rgba(245,185,113,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-8 py-12">
      <div className="absolute left-1/2 top-[59%] h-60 w-3 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#7ac27c,#2f7b4d)] shadow-[0_0_20px_rgba(122,194,124,0.28)]" />
      <div className="absolute left-1/2 top-[67%] h-28 w-32 -translate-x-[92%] rotate-[-30deg] rounded-[100%_0_100%_0] bg-[linear-gradient(180deg,#7ac27c,#34794b)] opacity-90" />
      <div className="absolute left-1/2 top-[74%] h-28 w-32 translate-x-[-8%] rotate-[24deg] rounded-[0_100%_0_100%] bg-[linear-gradient(180deg,#7ac27c,#34794b)] opacity-90" />
      <div className="absolute left-1/2 top-[47%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,185,113,0.26),rgba(245,185,113,0)_70%)] blur-2xl" />

      <div className="relative h-[28rem] w-[28rem]">
        {petals.map((petal, index) => (
          <FlowerPetal
            key={petal.id}
            index={index}
            onPluck={onPluck}
            petal={petal}
            total={petals.length}
          />
        ))}

        <div className="absolute left-1/2 top-1/2 h-30 w-30 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-100/20 bg-[radial-gradient(circle_at_35%_35%,#fff2b8,transparent_26%),radial-gradient(circle,#f1b94d,#b4711f)] shadow-[0_18px_32px_rgba(0,0,0,0.24)]" />
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.2),rgba(255,255,255,0)_65%)] blur-xl" />
      </div>
    </div>
  );
}
