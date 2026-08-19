import { useState, useEffect, useRef, useCallback } from "react";
import type { UseScrollUpDownOptions, UseScrollUpDownReturn, ScrollDirection } from "../types";
import { getScrollBehavior, scrollToTargetTop, scrollToTargetBottom, getScrollDimensions } from "../utils/scrollUtils";

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

  const onScrollChangeRef = useRef(onScrollChange);
  const onScrollToTopRef = useRef(onScrollToTop);
  const onScrollToBottomRef = useRef(onScrollToBottom);

  useEffect(() => {
    onScrollChangeRef.current = onScrollChange;
    onScrollToTopRef.current = onScrollToTop;
    onScrollToBottomRef.current = onScrollToBottom;
  });

  const scrollToBottom = useCallback(
    (customSmooth?: boolean) => {
      const behavior = getScrollBehavior(smoothScroll, customSmooth);
      scrollToTargetBottom(bottomRef, containerRef, behavior);
      if (onScrollToBottomRef.current) onScrollToBottomRef.current();
    },
    [bottomRef, containerRef, smoothScroll]
  );

  const scrollToTop = useCallback(
    (customSmooth?: boolean) => {
      const behavior = getScrollBehavior(smoothScroll, customSmooth);
      scrollToTargetTop(topRef, containerRef, behavior);
      if (onScrollToTopRef.current) onScrollToTopRef.current();
    },
    [topRef, containerRef, smoothScroll]
  );

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY, scrollHeight, clientHeight } = getScrollDimensions(containerRef?.current || null);
      const prevScrollY = prevScrollYRef.current;

      let newDirection: ScrollDirection | null = null;
      if (scrollY > prevScrollY && scrollY > showAtThreshold) newDirection = "down";
      else if (scrollY < prevScrollY && scrollY > 0) newDirection = "up";
      else if (scrollY === 0) newDirection = null;

      setScrollDirection((prev) => (newDirection !== null ? newDirection : prev));

      const maxScroll = Math.max(0, scrollHeight - clientHeight);
      const rawProgress = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0;
      const progressPercent = Number.isNaN(rawProgress) ? 0 : rawProgress;

      const atTop = scrollY < showAtThreshold;
      const atBottom = maxScroll > 0 && scrollY + clientHeight >= scrollHeight - 20;

      setCurrentScrollY(scrollY);
      setMaxScrollable(maxScroll);
      setScrollProgress(progressPercent);
      setIsAtTop(atTop);
      setIsAtBottom(atBottom);
      setIsVisible(!atBottom && scrollY >= showAtThreshold);
      prevScrollYRef.current = scrollY;

      if (onScrollChangeRef.current) {
        onScrollChangeRef.current(newDirection, Math.round(progressPercent));
      }

      if (autoHide) {
        setIsIdle(false);
        if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
        autoHideTimerRef.current = setTimeout(() => setIsIdle(true), autoHideDelay);
      }
    };

    const target = containerRef?.current || (typeof window !== "undefined" ? window : null);

    if (target) {
      target.addEventListener("scroll", handleScroll, { passive: true });
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleScroll, { passive: true });
      }
      handleScroll();
    }

    return () => {
      if (target) target.removeEventListener("scroll", handleScroll);
      if (typeof window !== "undefined") window.removeEventListener("resize", handleScroll);
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    };
  }, [containerRef, showAtThreshold, autoHide, autoHideDelay]);

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

export default useScrollUpDown;
