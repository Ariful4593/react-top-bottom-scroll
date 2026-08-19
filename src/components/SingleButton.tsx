import React from "react";
import type { ButtonPosition, ScrollDirection, ScrollMode } from "../types";
import { ArrowIcon } from "./Icons";
import { ProgressRing, type ProgressRingProps } from "./ProgressRing";

export interface SingleButtonProps extends ProgressRingProps {
  mode?: ScrollMode;
  scrollDirection: ScrollDirection | null;
  position?: ButtonPosition;
  isContainerMode: boolean;
  hiddenClass: string;
  className?: string;
  style?: React.CSSProperties;
  upTitleMessage?: string;
  downTitleMessage?: string;
  upIconColor?: string;
  downIconColor?: string;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  renderIcon?: (direction: ScrollDirection, progressPercent: number) => React.ReactNode;
}

export const SingleButton: React.FC<SingleButtonProps> = ({
  mode = "dynamic",
  scrollDirection,
  position = "bottom-right",
  isContainerMode,
  hiddenClass,
  className = "",
  style = {},
  upTitleMessage = "Scroll to top",
  downTitleMessage = "Scroll to bottom",
  upIconColor = "white",
  downIconColor = "white",
  scrollToTop,
  scrollToBottom,
  renderIcon,
  ...progressProps
}) => {
  const isDown =
    mode === "down-only" ? true : mode === "up-only" ? false : scrollDirection === "down";
  const activeDirection: ScrollDirection = isDown ? "down" : "up";
  const title = isDown ? downTitleMessage : upTitleMessage;
  const handleClick = isDown ? () => scrollToBottom() : () => scrollToTop();
  const iconColor = isDown ? downIconColor : upIconColor;

  const positionClass = isContainerMode
    ? `react-scroll-up-down-btn--container react-scroll-up-down-btn--container-${position}`
    : `react-scroll-up-down-btn--${position}`;
  const combinedClassName = `react-scroll-up-down-btn ${positionClass} ${hiddenClass} ${className}`.trim();

  return (
    <button
      type="button"
      id="scroll_button"
      aria-label={title}
      title={title}
      className={combinedClassName}
      style={style}
      onClick={handleClick}
    >
      <ProgressRing {...progressProps} />
      {renderIcon ? (
        renderIcon(activeDirection, Math.round(progressProps.scrollProgress))
      ) : (
        <ArrowIcon direction={activeDirection} color={iconColor} />
      )}
    </button>
  );
};
