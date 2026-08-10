import React, { useEffect, useState, useRef, useCallback } from "react";
import "./ScrollUpDown.css";

export type ScrollDirection = "up" | "down";
export type ButtonPosition = "bottom-right" | "bottom-left" | "bottom-center";

export interface ScrollUpDownProps {
  /** Ref to the element to scroll to when clicking down arrow */
  bottomRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
  /** Ref to the element to scroll to when clicking up arrow */
  topRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
  /** Ref to custom scroll container to track scrolling inside an element instead of window */
  containerRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
  /** Fill color of the scroll-up arrow icon */
  upIconColor?: string;
  /** Fill color of the scroll-down arrow icon */
  downIconColor?: string;
  /** Tooltip & accessibility title for scroll to top action */
  upTitleMessage?: string;
  /** Tooltip & accessibility title for scroll to bottom action */
  downTitleMessage?: string;
  /** Inline CSS styles for the button */
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
  /** Active stroke color of progress ring */
  progressColor?: string;
  /** Background track color of progress ring */
  progressTrackColor?: string;
  /** Stroke width in pixels for progress ring */
  progressStrokeWidth?: number;
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

const ScrollUpDown: React.FC<ScrollUpDownProps> = ({
  bottomRef = null,
  topRef = null,
  containerRef = null,
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
  autoHide = false,
  autoHideDelay = 3000,
  renderIcon = null,
  onScrollToTop = undefined,
  onScrollToBottom = undefined,
  onScrollChange = undefined,
}) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection | null>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isIdle, setIsIdle] = useState<boolean>(false);

  const prevScrollYRef = useRef<number>(0);
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const behavior: ScrollBehavior = smoothScroll ? "smooth" : "auto";

  const handleClickToBottom = useCallback(() => {
    const bottomElement = bottomRef?.current;
    const containerElement = containerRef?.current;

    if (bottomElement) {
      bottomElement.scrollIntoView({
        behavior,
        block: "end",
        inline: "nearest",
      });
    } else if (containerElement) {
      containerElement.scrollTo({
        top: containerElement.scrollHeight,
        behavior,
      });
    } else if (typeof window !== "undefined") {
      window.scrollTo({
        top: document.documentElement.scrollHeight || document.body.scrollHeight,
        behavior,
      });
    }

    if (onScrollToBottom) {
      onScrollToBottom();
    }
  }, [bottomRef, containerRef, behavior, onScrollToBottom]);

  const handleClickToTop = useCallback(() => {
    const topElement = topRef?.current;
    const containerElement = containerRef?.current;

    if (topElement) {
      topElement.scrollIntoView({
        behavior,
        block: "start",
        inline: "nearest",
      });
    } else if (containerElement) {
      containerElement.scrollTo({
        top: 0,
        behavior,
      });
    } else if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior,
      });
    }

    if (onScrollToTop) {
      onScrollToTop();
    }
  }, [topRef, containerRef, behavior, onScrollToTop]);

  useEffect(() => {
    const handleScroll = () => {
      const containerElement = containerRef?.current;
      let currentScrollY = 0;
      let scrollHeight = 0;
      let clientHeight = 0;

      if (containerElement) {
        currentScrollY = containerElement.scrollTop;
        scrollHeight = containerElement.scrollHeight;
        clientHeight = containerElement.clientHeight;
      } else if (typeof window !== "undefined") {
        currentScrollY =
          window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0;
        scrollHeight = Math.max(
          document.body?.scrollHeight || 0,
          document.documentElement?.scrollHeight || 0
        );
        clientHeight = window.innerHeight || document.documentElement?.clientHeight || 0;
      }

      const prevScrollY = prevScrollYRef.current;

      // Determine scroll direction
      let newDirection: ScrollDirection | null = scrollDirection;
      if (currentScrollY > prevScrollY && currentScrollY > showAtThreshold) {
        newDirection = "down";
      } else if (currentScrollY < prevScrollY && currentScrollY > 0) {
        newDirection = "up";
      } else if (currentScrollY === 0) {
        newDirection = null;
      }

      if (newDirection !== scrollDirection) {
        setScrollDirection(newDirection);
      }

      // Calculate scroll progress percentage (0 - 100)
      const maxScrollable = scrollHeight - clientHeight;
      const progressPercent =
        maxScrollable > 0 ? Math.min(100, Math.max(0, (currentScrollY / maxScrollable) * 100)) : 0;
      setScrollProgress(progressPercent);

      // Determine bottom threshold visibility
      const isAtBottom =
        maxScrollable > 0 && currentScrollY + clientHeight >= scrollHeight - 20;

      setShowScrollButton(!isAtBottom && currentScrollY >= showAtThreshold);
      prevScrollYRef.current = currentScrollY;

      if (onScrollChange) {
        onScrollChange(newDirection, Math.round(progressPercent));
      }

      // Handle auto-hide timer
      if (autoHide) {
        setIsIdle(false);
        if (autoHideTimerRef.current) {
          clearTimeout(autoHideTimerRef.current);
        }
        autoHideTimerRef.current = setTimeout(() => {
          setIsIdle(true);
        }, autoHideDelay);
      }
    };

    const target = containerRef?.current || (typeof window !== "undefined" ? window : null);

    if (target) {
      target.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      if (target) {
        target.removeEventListener("scroll", handleScroll);
      }
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
    };
  }, [
    containerRef,
    showAtThreshold,
    autoHide,
    autoHideDelay,
    scrollDirection,
    onScrollChange,
  ]);

  if (!showScrollButton || !scrollDirection) {
    return null;
  }

  const isDown = scrollDirection === "down";
  const title = isDown ? downTitleMessage : upTitleMessage;
  const handleClick = isDown ? handleClickToBottom : handleClickToTop;
  const strokeOffset = CIRCLE_CIRCUMFERENCE - (scrollProgress / 100) * CIRCLE_CIRCUMFERENCE;

  const isContainerMode = !!containerRef;
  const positionClass = isContainerMode
    ? `react-scroll-up-down-btn--container react-scroll-up-down-btn--container-${position}`
    : `react-scroll-up-down-btn--${position}`;
  const hiddenClass = autoHide && isIdle ? "react-scroll-up-down-btn--hidden" : "";
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
      {showProgress && (
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
      )}

      {renderIcon ? (
        renderIcon(scrollDirection, Math.round(scrollProgress))
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="12"
          viewBox="0 0 384 512"
          fill={isDown ? downIconColor : upIconColor}
          style={isDown ? { transform: "rotate(180deg)" } : undefined}
          aria-hidden="true"
        >
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      )}
    </button>
  );
};

export default ScrollUpDown;
