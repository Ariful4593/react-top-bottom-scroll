import React, { useState, useEffect, useRef, useCallback } from "react";

export type ScrollDirection = "up" | "down";

export interface UseScrollUpDownOptions {
  /** Ref to the element to scroll to when calling scrollToBottom */
  bottomRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
  /** Ref to the element to scroll to when calling scrollToTop */
  topRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
  /** Ref to custom scroll container to track scrolling inside an element instead of window */
  containerRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
  /** Minimum scroll distance in pixels before button/state indicates visible */
  showAtThreshold?: number;
  /** Enable smooth or instant scroll behavior */
  smoothScroll?: boolean;
  /** Auto-hide / idle detection after a period of scroll inactivity */
  autoHide?: boolean;
  /** Inactivity delay in milliseconds before triggering idle state */
  autoHideDelay?: number;
  /** Callback fired when user triggers scroll to top */
  onScrollToTop?: () => void;
  /** Callback fired when user triggers scroll to bottom */
  onScrollToBottom?: () => void;
  /** Callback fired when scroll direction or progress changes */
  onScrollChange?: (direction: ScrollDirection | null, progressPercent: number) => void;
}

export interface UseScrollUpDownReturn {
  /** Current scroll direction: 'up', 'down', or null */
  scrollDirection: ScrollDirection | null;
  /** Scroll progress percentage (0 - 100) */
  scrollProgress: number;
  /** Current scroll position in pixels */
  currentScrollY: number;
  /** Maximum scrollable distance in pixels */
  maxScrollable: number;
  /** Whether the scroll position is at the top (within threshold) */
  isAtTop: boolean;
  /** Whether the scroll position has reached the bottom */
  isAtBottom: boolean;
  /** Whether the scroll button should normally be visible */
  isVisible: boolean;
  /** Whether the user is currently idle (when autoHide is enabled) */
  isIdle: boolean;
  /** Programmatically trigger scroll to top */
  scrollToTop: (customSmooth?: boolean) => void;
  /** Programmatically trigger scroll to bottom */
  scrollToBottom: (customSmooth?: boolean) => void;
}

export const useScrollUpDown = (options: UseScrollUpDownOptions = {}): UseScrollUpDownReturn => {
  const {
    bottomRef = null,
    topRef = null,
    containerRef = null,
    showAtThreshold = 10,
    smoothScroll = true,
    autoHide = false,
    autoHideDelay = 3000,
    onScrollToTop,
    onScrollToBottom,
    onScrollChange,
  } = options;

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentScrollY, setCurrentScrollY] = useState<number>(0);
  const [maxScrollable, setMaxScrollable] = useState<number>(0);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isIdle, setIsIdle] = useState<boolean>(false);

  const prevScrollYRef = useRef<number>(0);
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getScrollBehavior = (customSmooth?: boolean): ScrollBehavior => {
    if (typeof customSmooth === "boolean") {
      return customSmooth ? "smooth" : "auto";
    }
    return smoothScroll ? "smooth" : "auto";
  };

  const scrollToBottom = useCallback(
    (customSmooth?: boolean) => {
      const behavior = getScrollBehavior(customSmooth);
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bottomRef, containerRef, smoothScroll, onScrollToBottom]
  );

  const scrollToTop = useCallback(
    (customSmooth?: boolean) => {
      const behavior = getScrollBehavior(customSmooth);
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topRef, containerRef, smoothScroll, onScrollToTop]
  );

  useEffect(() => {
    const handleScroll = () => {
      const containerElement = containerRef?.current;
      let scrollY = 0;
      let scrollHeight = 0;
      let clientHeight = 0;

      if (containerElement) {
        scrollY = containerElement.scrollTop;
        scrollHeight = containerElement.scrollHeight;
        clientHeight = containerElement.clientHeight;
      } else if (typeof window !== "undefined") {
        scrollY =
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
      if (scrollY > prevScrollY && scrollY > showAtThreshold) {
        newDirection = "down";
      } else if (scrollY < prevScrollY && scrollY > 0) {
        newDirection = "up";
      } else if (scrollY === 0) {
        newDirection = null;
      }

      if (newDirection !== scrollDirection) {
        setScrollDirection(newDirection);
      }

      // Calculate max scrollable and progress %
      const maxScroll = Math.max(0, scrollHeight - clientHeight);
      const progressPercent =
        maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0;

      const atTop = scrollY < showAtThreshold;
      const atBottom = maxScroll > 0 && scrollY + clientHeight >= scrollHeight - 20;

      setCurrentScrollY(scrollY);
      setMaxScrollable(maxScroll);
      setScrollProgress(progressPercent);
      setIsAtTop(atTop);
      setIsAtBottom(atBottom);
      setIsVisible(!atBottom && scrollY >= showAtThreshold);
      prevScrollYRef.current = scrollY;

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

  return {
    scrollDirection,
    scrollProgress,
    currentScrollY,
    maxScrollable,
    isAtTop,
    isAtBottom,
    isVisible,
    isIdle,
    scrollToTop,
    scrollToBottom,
  };
};

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

export default useScrollUpDown;
