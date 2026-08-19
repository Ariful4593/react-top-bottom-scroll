import { default as React } from 'react';

export type ScrollDirection = "up" | "down";
export type ButtonPosition = "bottom-right" | "bottom-left" | "bottom-center";
export type ScrollMode = "dynamic" | "dual" | "up-only" | "down-only";
export type DualLayout = "vertical" | "horizontal";
export type ProgressBarPosition = "top" | "bottom";
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
export interface ScrollUpDownProps {
    bottomRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
    topRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
    containerRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null;
    mode?: ScrollMode;
    dualLayout?: DualLayout;
    dualGap?: number | string;
    upIconColor?: string;
    downIconColor?: string;
    upTitleMessage?: string;
    downTitleMessage?: string;
    style?: React.CSSProperties;
    className?: string;
    position?: ButtonPosition;
    showAtThreshold?: number;
    smoothScroll?: boolean;
    showProgress?: boolean;
    progressColor?: string;
    progressTrackColor?: string;
    progressStrokeWidth?: number;
    showProgressBar?: boolean;
    progressBarPosition?: ProgressBarPosition;
    progressBarHeight?: number | string;
    progressBarColor?: string;
    progressBarTrackColor?: string;
    progressBarZIndex?: number;
    autoHide?: boolean;
    autoHideDelay?: number;
    renderIcon?: (direction: ScrollDirection, progressPercent: number) => React.ReactNode;
    onScrollToTop?: () => void;
    onScrollToBottom?: () => void;
    onScrollChange?: (direction: ScrollDirection | null, progressPercent: number) => void;
}
