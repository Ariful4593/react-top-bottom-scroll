import { default as React } from 'react';

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
declare const ScrollUpDown: React.FC<ScrollUpDownProps>;
export default ScrollUpDown;
