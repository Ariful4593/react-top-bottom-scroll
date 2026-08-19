import React from "react";
import type { ProgressBarPosition } from "../types";

export interface ProgressBarProps {
  showProgressBar?: boolean;
  progressBarPosition?: ProgressBarPosition;
  progressBarHeight?: number | string;
  progressBarColor?: string;
  progressBarTrackColor?: string;
  progressBarZIndex?: number;
  scrollProgress: number;
  isContainerMode: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  showProgressBar = false,
  progressBarPosition = "top",
  progressBarHeight = 3,
  progressBarColor = "#3b82f6",
  progressBarTrackColor = "transparent",
  progressBarZIndex = 10002,
  scrollProgress,
  isContainerMode,
}) => {
  if (!showProgressBar) return null;

  const normalizedHeight =
    typeof progressBarHeight === "number" ? `${progressBarHeight}px` : progressBarHeight;

  const barClass = isContainerMode
    ? `react-scroll-reading-bar react-scroll-reading-bar--container react-scroll-reading-bar--${progressBarPosition}`
    : `react-scroll-reading-bar react-scroll-reading-bar--${progressBarPosition}`;

  return (
    <div
      className={barClass}
      style={{
        height: normalizedHeight,
        backgroundColor: progressBarTrackColor,
        zIndex: progressBarZIndex,
      }}
      aria-hidden="true"
    >
      <div
        className="react-scroll-reading-bar-indicator"
        style={{
          background: progressBarColor,
          width: `${scrollProgress}%`,
        }}
      />
    </div>
  );
};
