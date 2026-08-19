import React from "react";
import useScrollUpDown from "./useScrollUpDown";

/**
 * Lightweight hook to track scroll progress (0 - 100%) and scroll position
 */
export const useScrollProgress = (
  containerRef: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null = null
) => {
  const { scrollProgress, currentScrollY, maxScrollable } = useScrollUpDown({
    containerRef,
  });

  return {
    scrollProgress,
    currentScrollY,
    maxScrollable,
  };
};

export default useScrollProgress;
