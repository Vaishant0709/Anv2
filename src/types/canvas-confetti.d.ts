declare module "canvas-confetti" {
  type Options = {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
  };

  type ConfettiFunction = (options?: Options) => Promise<null>;

  const confetti: ConfettiFunction;

  export default confetti;
}
