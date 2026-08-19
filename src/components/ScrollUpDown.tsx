import React from "react";
import "./ScrollUpDown.css";
import { useScrollUpDown } from "../hooks/useScrollUpDown";
import { ProgressBar } from "./ProgressBar";
import { DualButtons } from "./DualButtons";
import { SingleButton } from "./SingleButton";
import type { ScrollUpDownProps } from "../types";

export type {
  ScrollDirection,
  UseScrollUpDownOptions,
  ButtonPosition,
  ScrollMode,
  DualLayout,
  ProgressBarPosition,
  ScrollUpDownProps,
} from "../types";

const ScrollUpDown: React.FC<ScrollUpDownProps> = ({
  bottomRef = null,
  topRef = null,
  containerRef = null,
  mode = "dynamic",
  dualLayout = "vertical",
  dualGap = 8,
  upIconColor = "white",
  downIconColor = "white",
  upTitleMessage = "Scroll to top",
  downTitleMessage = "Scroll to bottom",
  style = {},
  className = "",
  position = "bottom-right",
  showAtThreshold = 10,
  smoothScroll = true,
  showProgress = false,
  progressColor = "#3b82f6",
  progressTrackColor = "rgba(255, 255, 255, 0.2)",
  progressStrokeWidth = 3,
  showProgressBar = false,
  progressBarPosition = "top",
  progressBarHeight = 3,
  progressBarColor = "#3b82f6",
  progressBarTrackColor = "transparent",
  progressBarZIndex = 10002,
  autoHide = false,
  autoHideDelay = 3000,
  renderIcon = null,
  onScrollToTop = undefined,
  onScrollToBottom = undefined,
  onScrollChange = undefined,
}) => {
  const {
    scrollDirection,
    scrollProgress,
    isAtTop,
    isAtBottom,
    isVisible,
    isIdle,
    scrollToTop,
    scrollToBottom,
  } = useScrollUpDown({
    bottomRef,
    topRef,
    containerRef,
    showAtThreshold,
    smoothScroll,
    autoHide,
    autoHideDelay,
    onScrollToTop,
    onScrollToBottom,
    onScrollChange,
  });

  const isContainerMode = !!containerRef;
  const hiddenClass = autoHide && isIdle ? "react-scroll-up-down-btn--hidden" : "";

  let shouldRenderButton = false;
  if (mode === "dynamic") shouldRenderButton = isVisible && scrollDirection !== null;
  else if (mode === "up-only") shouldRenderButton = !isAtTop;
  else if (mode === "down-only") shouldRenderButton = !isAtBottom;
  else if (mode === "dual") shouldRenderButton = !isAtTop || !isAtBottom;

  const sharedProgressProps = {
    showProgress,
    progressColor,
    progressTrackColor,
    progressStrokeWidth,
    scrollProgress,
  };

  return (
    <>
      <ProgressBar
        showProgressBar={showProgressBar}
        progressBarPosition={progressBarPosition}
        progressBarHeight={progressBarHeight}
        progressBarColor={progressBarColor}
        progressBarTrackColor={progressBarTrackColor}
        progressBarZIndex={progressBarZIndex}
        scrollProgress={scrollProgress}
        isContainerMode={isContainerMode}
      />
      {shouldRenderButton &&
        (mode === "dual" ? (
          <DualButtons
            dualLayout={dualLayout}
            dualGap={dualGap}
            position={position}
            isContainerMode={isContainerMode}
            hiddenClass={hiddenClass}
            className={className}
            style={style}
            upTitleMessage={upTitleMessage}
            downTitleMessage={downTitleMessage}
            upIconColor={upIconColor}
            downIconColor={downIconColor}
            isAtTop={isAtTop}
            isAtBottom={isAtBottom}
            scrollToTop={scrollToTop}
            scrollToBottom={scrollToBottom}
            renderIcon={renderIcon || undefined}
            {...sharedProgressProps}
          />
        ) : (
          <SingleButton
            mode={mode}
            scrollDirection={scrollDirection}
            position={position}
            isContainerMode={isContainerMode}
            hiddenClass={hiddenClass}
            className={className}
            style={style}
            upTitleMessage={upTitleMessage}
            downTitleMessage={downTitleMessage}
            upIconColor={upIconColor}
            downIconColor={downIconColor}
            scrollToTop={scrollToTop}
            scrollToBottom={scrollToBottom}
            renderIcon={renderIcon || undefined}
            {...sharedProgressProps}
          />
        ))}
    </>
  );
};

export default ScrollUpDown;
