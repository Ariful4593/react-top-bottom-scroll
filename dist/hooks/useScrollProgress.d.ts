import { default as React } from 'react';

/**
 * Lightweight hook to track scroll progress (0 - 100%) and scroll position
 */
export declare const useScrollProgress: (containerRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null) => {
    scrollProgress: number;
    currentScrollY: number;
    maxScrollable: number;
};
export default useScrollProgress;
