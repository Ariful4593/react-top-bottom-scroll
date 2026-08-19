import { default as React } from 'react';

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
export declare const useScrollUpDown: (options?: UseScrollUpDownOptions) => UseScrollUpDownReturn;
/**
 * Lightweight hook to track scroll progress (0 - 100%) and scroll position
 */
export declare const useScrollProgress: (containerRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null) => {
    scrollProgress: number;
    currentScrollY: number;
    maxScrollable: number;
};
export default useScrollUpDown;
