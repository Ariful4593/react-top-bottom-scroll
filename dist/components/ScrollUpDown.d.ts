import { default as React } from 'react';

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
declare const ScrollUpDown: React.FC<ScrollUpDownProps>;
export default ScrollUpDown;
