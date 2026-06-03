import type { TerminalAnimationFrame } from "./terminal";

export function generateProceduralWave(frameCount: number = 40): TerminalAnimationFrame[] {
  const frames: TerminalAnimationFrame[] = [];
  const width = 45;
  const height = 10;
  
  for (let f = 0; f < frameCount; f++) {
    let text = "";
    for (let y = 0; y < height; y++) {
      let row = "";
      for (let x = 0; x < width; x++) {
        // Create a sine wave that moves forward over time
        const waveY = Math.floor(Math.sin((x + f * 1.5) * 0.2) * 3) + 5;
        row += waveY === y ? "*" : " ";
      }
      text += row + "\n";
    }
    frames.push({ text });
  }
  
  return frames;
}