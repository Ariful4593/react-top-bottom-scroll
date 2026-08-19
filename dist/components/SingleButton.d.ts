import { default as React } from 'react';
import { ButtonPosition, ScrollDirection, ScrollMode } from '../types';
import { ProgressRingProps } from './ProgressRing';

export interface SingleButtonProps extends ProgressRingProps {
    mode?: ScrollMode;
    scrollDirection: ScrollDirection | null;
    position?: ButtonPosition;
    isContainerMode: boolean;
    hiddenClass: string;
    className?: string;
    style?: React.CSSProperties;
    upTitleMessage?: string;
    downTitleMessage?: string;
    upIconColor?: string;
    downIconColor?: string;
    scrollToTop: () => void;
    scrollToBottom: () => void;
    renderIcon?: (direction: ScrollDirection, progressPercent: number) => React.ReactNode;
}
export declare const SingleButton: React.FC<SingleButtonProps>;
