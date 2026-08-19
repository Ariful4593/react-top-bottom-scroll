import { default as React } from 'react';
import { ScrollDirection } from '../hooks/useScrollUpDown';

export type { ScrollDirection, UseScrollUpDownOptions } from '../hooks/useScrollUpDown';
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
declare const ScrollUpDown: React.FC<ScrollUpDownProps>;
export default ScrollUpDown;
