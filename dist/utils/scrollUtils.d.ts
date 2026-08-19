import { default as React } from 'react';

export declare function getScrollBehavior(smooth?: boolean, customSmooth?: boolean): ScrollBehavior;
export declare function getScrollDimensions(containerElement: HTMLElement | null): {
    scrollY: number;
    scrollHeight: number;
    clientHeight: number;
};
export declare function scrollToTargetBottom(bottomRef: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null, containerRef: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null, behavior: ScrollBehavior): void;
export declare function scrollToTargetTop(topRef: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null, containerRef: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null, behavior: ScrollBehavior): void;
