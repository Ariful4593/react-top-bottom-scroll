import React from "react";
import "./ScrollUpDown.css";
import { useScrollUpDown, type ScrollDirection } from "../hooks/useScrollUpDown";

export type { ScrollDirection, UseScrollUpDownOptions } from "../hooks/useScrollUpDown";
export type ButtonPosition = "bottom-right" | "bottom-left" | "bottom-center";
export type ScrollMode = "dynamic" | "dual" | "up-only" | "down-only";
export type DualLayout = "vertical" | "horizontal";
export type ProgressBarPosition = "top" | "bottom";

export interface ScrollUpDownProps {
  /** Ref to the element to scroll to when clicking down arrow */
  bottomRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
  /** Ref to the element to scroll to when clicking up arrow */
  topRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
  /** Ref to custom scroll container to track scrolling inside an element instead of window */
  containerRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
  /** Operation mode of the button(s): dynamic switcher, dual buttons, up only, or down only */
  mode?: ScrollMode;
  /** Layout direction when mode is 'dual' ('vertical' or 'horizontal') */
  dualLayout?: DualLayout;
  /** Gap spacing between buttons when mode is 'dual' (e.g. 8 or '8px') */
  dualGap?: number | string;
  /** Fill color of the scroll-up arrow icon */
  upIconColor?: string;
  /** Fill color of the scroll-down arrow icon */
  downIconColor?: string;
  /** Tooltip & accessibility title for scroll to top action */
  upTitleMessage?: string;
  /** Tooltip & accessibility title for scroll to bottom action */
  downTitleMessage?: string;
  /** Inline CSS styles for the button or dual container */
  style?: React.CSSProperties;
  /** Additional CSS class names */
  className?: string;
  /** Button position preset */
  position?: ButtonPosition;
  /** Minimum scroll distance in pixels before button appears */
  showAtThreshold?: number;
  /** Enable smooth or instant scroll behavior */
  smoothScroll?: boolean;
  /** Enable circular progress indicator ring around the button */
  showProgress?: boolean;
  /** Active stroke color of circular progress ring */
  progressColor?: string;
  /** Background track color of circular progress ring */
  progressTrackColor?: string;
  /** Stroke width in pixels for circular progress ring */
  progressStrokeWidth?: number;
  /** Enable horizontal reading progress bar across the screen/container */
  showProgressBar?: boolean;
  /** Position of the reading progress bar ('top' or 'bottom') */
  progressBarPosition?: ProgressBarPosition;
  /** Height in pixels or CSS value for reading progress bar (e.g. 3 or '3px') */
  progressBarHeight?: number | string;
  /** Color or gradient background for reading progress bar */
  progressBarColor?: string;
  /** Background track color for reading progress bar */
  progressBarTrackColor?: string;
  /** z-index for the reading progress bar */
  progressBarZIndex?: number;
  /** Auto-hide button after a period of inactivity */
  autoHide?: boolean;
  /** Inactivity delay in milliseconds before hiding button */
  autoHideDelay?: number;
  /** Custom render callback for the icon */
  renderIcon?: (direction: ScrollDirection, progressPercent: number) => React.ReactNode;
  /** Callback fired when user clicks to scroll to top */
  onScrollToTop?: () => void;
  /** Callback fired when user clicks to scroll to bottom */
  onScrollToBottom?: () => void;
  /** Callback fired when scroll direction or progress changes */
  onScrollChange?: (direction: ScrollDirection | null, progressPercent: number) => void;
}

const CIRCLE_RADIUS = 18;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const ArrowIcon: React.FC<{
  direction: "up" | "down";
  color: string;
}> = ({ direction, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="12"
    viewBox="0 0 384 512"
    fill={color}
    style={direction === "down" ? { transform: "rotate(180deg)" } : undefined}
    aria-hidden="true"
  >
    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
  </svg>
);

const ScrollUpDown: React.FC<ScrollUpDownProps> = ({
  bottomRef = null,
  topRef = null,
  containerRef = null,
  mode = "dynamic",
  dualLayout = "vertical",
  dualGap = 8,
  upIconColor = "white",
  downIconColor = "white",
  upTitleMessage = "Scroll to top",
  downTitleMessage = "Scroll to bottom",
  style = {},
  className = "",
  position = "bottom-right",
  showAtThreshold = 10,
  smoothScroll = true,
  showProgress = false,
  progressColor = "#3b82f6",
  progressTrackColor = "rgba(255, 255, 255, 0.2)",
  progressStrokeWidth = 3,
  showProgressBar = false,
  progressBarPosition = "top",
  progressBarHeight = 3,
  progressBarColor = "#3b82f6",
  progressBarTrackColor = "transparent",
  progressBarZIndex = 10002,
  autoHide = false,
  autoHideDelay = 3000,
  renderIcon = null,
  onScrollToTop = undefined,
  onScrollToBottom = undefined,
  onScrollChange = undefined,
}) => {
  const {
    scrollDirection,
    scrollProgress,
    isAtTop,
    isAtBottom,
    isVisible,
    isIdle,
    scrollToTop,
    scrollToBottom,
  } = useScrollUpDown({
    bottomRef,
    topRef,
    containerRef,
    showAtThreshold,
    smoothScroll,
    autoHide,
    autoHideDelay,
    onScrollToTop,
    onScrollToBottom,
    onScrollChange,
  });

  const isContainerMode = !!containerRef;
  const positionClass = isContainerMode
    ? `react-scroll-up-down-btn--container react-scroll-up-down-btn--container-${position}`
    : `react-scroll-up-down-btn--${position}`;
  const hiddenClass = autoHide && isIdle ? "react-scroll-up-down-btn--hidden" : "";
  const strokeOffset = CIRCLE_CIRCUMFERENCE - (scrollProgress / 100) * CIRCLE_CIRCUMFERENCE;

  const normalizedBarHeight =
    typeof progressBarHeight === "number" ? `${progressBarHeight}px` : progressBarHeight;
  const normalizedGap = typeof dualGap === "number" ? `${dualGap}px` : dualGap;

  // Render Horizontal Reading Progress Bar
  const renderProgressBarElement = () => {
    if (!showProgressBar) return null;

    const barClass = isContainerMode
      ? `react-scroll-reading-bar react-scroll-reading-bar--container react-scroll-reading-bar--${progressBarPosition}`
      : `react-scroll-reading-bar react-scroll-reading-bar--${progressBarPosition}`;

    return (
      <div
        className={barClass}
        style={{
          height: normalizedBarHeight,
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

  const renderProgressRing = () => {
    if (!showProgress) return null;
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

  // Determine button visibility based on mode
  let shouldRenderButton = false;
  if (mode === "dynamic") {
    shouldRenderButton = isVisible && scrollDirection !== null;
  } else if (mode === "up-only") {
    shouldRenderButton = !isAtTop;
  } else if (mode === "down-only") {
    shouldRenderButton = !isAtBottom;
  } else if (mode === "dual") {
    shouldRenderButton = !isAtTop || !isAtBottom;
  }

  // If dual mode, render both buttons
  if (mode === "dual") {
    const dualContainerClass = isContainerMode
      ? `react-scroll-up-down-dual react-scroll-up-down-dual--container react-scroll-up-down-dual--${dualLayout} react-scroll-up-down-dual--container-${position} ${hiddenClass} ${className}`.trim()
      : `react-scroll-up-down-dual react-scroll-up-down-dual--${dualLayout} react-scroll-up-down-dual--${position} ${hiddenClass} ${className}`.trim();

    return (
      <>
        {renderProgressBarElement()}
        {shouldRenderButton && (
          <div
            className={dualContainerClass}
            style={{ ...style, gap: normalizedGap }}
            role="group"
            aria-label="Scroll controls"
          >
            {/* Top / Up Button */}
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
              {renderProgressRing()}
              {renderIcon ? (
                renderIcon("up", Math.round(scrollProgress))
              ) : (
                <ArrowIcon direction="up" color={upIconColor} />
              )}
            </button>

            {/* Bottom / Down Button */}
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
                renderIcon("down", Math.round(scrollProgress))
              ) : (
                <ArrowIcon direction="down" color={downIconColor} />
              )}
            </button>
          </div>
        )}
      </>
    );
  }

  // Single button modes (dynamic, up-only, down-only)
  const isDown =
    mode === "down-only" ? true : mode === "up-only" ? false : scrollDirection === "down";
  const activeDirection: ScrollDirection = isDown ? "down" : "up";
  const title = isDown ? downTitleMessage : upTitleMessage;
  const handleClick = isDown ? () => scrollToBottom() : () => scrollToTop();
  const iconColor = isDown ? downIconColor : upIconColor;

  const combinedClassName = `react-scroll-up-down-btn ${positionClass} ${hiddenClass} ${className}`.trim();

  return (
    <>
      {renderProgressBarElement()}
      {shouldRenderButton && (
        <button
          type="button"
          id="scroll_button"
          aria-label={title}
          title={title}
          className={combinedClassName}
          style={style}
          onClick={handleClick}
        >
          {renderProgressRing()}
          {renderIcon ? (
            renderIcon(activeDirection, Math.round(scrollProgress))
          ) : (
            <ArrowIcon direction={activeDirection} color={iconColor} />
          )}
        </button>
      )}
    </>
  );
};

export default ScrollUpDown;
