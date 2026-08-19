import React from "react";
import type { DualLayout, ButtonPosition, ScrollDirection } from "../types";
import { ArrowIcon } from "./Icons";
import { ProgressRing, type ProgressRingProps } from "./ProgressRing";

export interface DualButtonsProps extends ProgressRingProps {
  dualLayout?: DualLayout;
  dualGap?: number | string;
  position?: ButtonPosition;
  isContainerMode: boolean;
  hiddenClass: string;
  className?: string;
  style?: React.CSSProperties;
  upTitleMessage?: string;
  downTitleMessage?: string;
  upIconColor?: string;
  downIconColor?: string;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  renderIcon?: (direction: ScrollDirection, progressPercent: number) => React.ReactNode;
}

export const DualButtons: React.FC<DualButtonsProps> = ({
  dualLayout = "vertical",
  dualGap = 8,
  position = "bottom-right",
  isContainerMode,
  hiddenClass,
  className = "",
  style = {},
  upTitleMessage = "Scroll to top",
  downTitleMessage = "Scroll to bottom",
  upIconColor = "white",
  downIconColor = "white",
  isAtTop,
  isAtBottom,
  scrollToTop,
  scrollToBottom,
  renderIcon,
  ...progressProps
}) => {
  const normalizedGap = typeof dualGap === "number" ? `${dualGap}px` : dualGap;

  const dualContainerClass = isContainerMode
    ? `react-scroll-up-down-dual react-scroll-up-down-dual--container react-scroll-up-down-dual--${dualLayout} react-scroll-up-down-dual--container-${position} ${hiddenClass} ${className}`.trim()
    : `react-scroll-up-down-dual react-scroll-up-down-dual--${dualLayout} react-scroll-up-down-dual--${position} ${hiddenClass} ${className}`.trim();

  return (
    <div
      className={dualContainerClass}
      style={{ ...style, gap: normalizedGap }}
      role="group"
      aria-label="Scroll controls"
    >
      <button
        type="button"
        id="scroll_button_top"
        aria-label={upTitleMessage}
        title={upTitleMessage}
        className={`react-scroll-up-down-btn react-scroll-up-down-btn--dual ${
          isAtTop ? "react-scroll-up-down-btn--disabled" : ""
        }`}
        disabled={isAtTop}
        onClick={() => scrollToTop()}
      >
        <ProgressRing {...progressProps} />
        {renderIcon ? (
          renderIcon("up", Math.round(progressProps.scrollProgress))
        ) : (
          <ArrowIcon direction="up" color={upIconColor} />
        )}
      </button>

      <button
        type="button"
        id="scroll_button_bottom"
        aria-label={downTitleMessage}
        title={downTitleMessage}
        className={`react-scroll-up-down-btn react-scroll-up-down-btn--dual ${
          isAtBottom ? "react-scroll-up-down-btn--disabled" : ""
        }`}
        disabled={isAtBottom}
        onClick={() => scrollToBottom()}
      >
        {renderIcon ? (
          renderIcon("down", Math.round(progressProps.scrollProgress))
        ) : (
          <ArrowIcon direction="down" color={downIconColor} />
        )}
      </button>
    </div>
  );
};
