import { default as React } from 'react';
import { ProgressBarPosition } from '../types';

export interface ProgressBarProps {
    showProgressBar?: boolean;
    progressBarPosition?: ProgressBarPosition;
    progressBarHeight?: number | string;
    progressBarColor?: string;
    progressBarTrackColor?: string;
    progressBarZIndex?: number;
    scrollProgress: number;
    isContainerMode: boolean;
}
export declare const ProgressBar: React.FC<ProgressBarProps>;
