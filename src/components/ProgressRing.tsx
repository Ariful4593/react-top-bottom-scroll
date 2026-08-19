import React from "react";

export const CIRCLE_RADIUS = 18;
export const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export interface ProgressRingProps {
  showProgress?: boolean;
  progressColor?: string;
  progressTrackColor?: string;
  progressStrokeWidth?: number;
  scrollProgress: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  showProgress = false,
  progressColor = "#3b82f6",
  progressTrackColor = "rgba(255, 255, 255, 0.2)",
  progressStrokeWidth = 3,
  scrollProgress,
}) => {
  if (!showProgress) return null;

  const strokeOffset = CIRCLE_CIRCUMFERENCE - (scrollProgress / 100) * CIRCLE_CIRCUMFERENCE;

  return (
    <svg
      className="react-scroll-up-down-progress-ring"
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <circle
        cx="22"
        cy="22"
        r={CIRCLE_RADIUS}
        fill="none"
        stroke={progressTrackColor}
        strokeWidth={progressStrokeWidth}
      />
      <circle
        cx="22"
        cy="22"
        r={CIRCLE_RADIUS}
        fill="none"
        stroke={progressColor}
        strokeWidth={progressStrokeWidth}
        strokeDasharray={CIRCLE_CIRCUMFERENCE}
        strokeDashoffset={strokeOffset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
      />
    </svg>
  );
};
