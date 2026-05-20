"use client";

import { useEffect, useState } from "react";

interface WindowDimensions {
  width: number;
  height: number;
}

function getViewportDimensions(): WindowDimensions {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState<WindowDimensions>(() => getViewportDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getViewportDimensions());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimensions;
}
