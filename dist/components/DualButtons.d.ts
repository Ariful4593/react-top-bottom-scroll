import { default as React } from 'react';
import { DualLayout, ButtonPosition, ScrollDirection } from '../types';
import { ProgressRingProps } from './ProgressRing';

export interface DualButtonsProps extends ProgressRingProps {
    dualLayout?: DualLayout;
    dualGap?: number | string;
    position?: ButtonPosition;
    isContainerMode: boolean;
    hiddenClass: string;
    className?: string;
    style?: React.CSSProperties;
    upTitleMessage?: string;
    downTitleMessage?: string;
    upIconColor?: string;
    downIconColor?: string;
    isAtTop: boolean;
    isAtBottom: boolean;
    scrollToTop: () => void;
    scrollToBottom: () => void;
    renderIcon?: (direction: ScrollDirection, progressPercent: number) => React.ReactNode;
}
export declare const DualButtons: React.FC<DualButtonsProps>;
