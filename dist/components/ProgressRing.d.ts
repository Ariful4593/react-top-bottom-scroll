import { default as React } from 'react';

export declare const CIRCLE_RADIUS = 18;
export declare const CIRCLE_CIRCUMFERENCE: number;
export interface ProgressRingProps {
    showProgress?: boolean;
    progressColor?: string;
    progressTrackColor?: string;
    progressStrokeWidth?: number;
    scrollProgress: number;
}
export declare const ProgressRing: React.FC<ProgressRingProps>;
