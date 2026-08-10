import React, { useEffect, useState, useRef, useCallback } from "react";
import "./ScrollUpDown.css";

export type ScrollDirection = "up" | "down";

export interface ScrollUpDownProps {
  /** Ref to the element to scroll to when clicking down arrow */
  bottomRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
  /** Ref to the element to scroll to when clicking up arrow */
  topRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
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
  /** Custom render callback for the icon */
  renderIcon?: (direction: ScrollDirection) => React.ReactNode;
}

const ScrollUpDown: React.FC<ScrollUpDownProps> = ({
  bottomRef = null,
  topRef = null,
  upIconColor = "white",
  downIconColor = "white",
  upTitleMessage = "Scroll to top",
  downTitleMessage = "Scroll to bottom",
  style = {},
  className = "",
  renderIcon = null,
}) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection | null>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  const prevScrollYRef = useRef<number>(0);

  const handleClickToBottom = useCallback(() => {
    const bottomElement = bottomRef?.current;
    if (bottomElement) {
      bottomElement.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight || document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [bottomRef]);

  const handleClickToTop = useCallback(() => {
    const topElement = topRef?.current;
    if (topElement) {
      topElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [topRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const currentScrollY =
        window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0;
      const prevScrollY = prevScrollYRef.current;

      // Determine scroll direction
      if (currentScrollY > prevScrollY && currentScrollY > 10) {
        setScrollDirection("down");
      } else if (currentScrollY < prevScrollY && currentScrollY > 0) {
        setScrollDirection("up");
      } else if (currentScrollY === 0) {
        setScrollDirection(null);
      }

      // Determine bottom threshold visibility
      const scrollHeight = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0
      );
      const clientHeight = window.innerHeight || document.documentElement?.clientHeight || 0;
      const isAtBottom =
        scrollHeight > clientHeight && currentScrollY + clientHeight >= scrollHeight - 20;

      setShowScrollButton(!isAtBottom && currentScrollY > 0);
      prevScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showScrollButton || !scrollDirection) {
    return null;
  }

  const isDown = scrollDirection === "down";
  const title = isDown ? downTitleMessage : upTitleMessage;
  const handleClick = isDown ? handleClickToBottom : handleClickToTop;

  return (
    <button
      type="button"
      id="scroll_button"
      aria-label={title}
      title={title}
      className={`react-scroll-up-down-btn ${className}`.trim()}
      style={style}
      onClick={handleClick}
    >
      {renderIcon ? (
        renderIcon(scrollDirection)
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
