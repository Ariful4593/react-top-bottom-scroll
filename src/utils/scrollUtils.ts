import React from "react";

export function getScrollBehavior(smooth?: boolean, customSmooth?: boolean): ScrollBehavior {
  if (typeof customSmooth === "boolean") {
    return customSmooth ? "smooth" : "auto";
  }
  return smooth ? "smooth" : "auto";
}

export function getScrollDimensions(containerElement: HTMLElement | null) {
  let scrollY = 0;
  let scrollHeight = 0;
  let clientHeight = 0;

  if (containerElement) {
    scrollY = containerElement.scrollTop || 0;
    scrollHeight = containerElement.scrollHeight || 0;
    clientHeight = containerElement.clientHeight || 0;
  } else if (typeof window !== "undefined") {
    scrollY =
      window.scrollY ||
      window.pageYOffset ||
      (typeof document !== "undefined"
        ? document.documentElement?.scrollTop || document.body?.scrollTop || 0
        : 0);
    scrollHeight =
      typeof document !== "undefined"
        ? Math.max(
            document.body?.scrollHeight || 0,
            document.documentElement?.scrollHeight || 0
          )
        : 0;
    clientHeight =
      window.innerHeight ||
      (typeof document !== "undefined"
        ? document.documentElement?.clientHeight || document.body?.clientHeight || 0
        : 0);
  }

  return { scrollY, scrollHeight, clientHeight };
}

export function scrollToTargetBottom(
  bottomRef: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null,
  containerRef: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null,
  behavior: ScrollBehavior
) {
  const bottomElement = bottomRef?.current;
  const containerElement = containerRef?.current;

  if (bottomElement && typeof bottomElement.scrollIntoView === "function") {
    bottomElement.scrollIntoView({ behavior, block: "end", inline: "nearest" });
  } else if (containerElement && typeof containerElement.scrollTo === "function") {
    containerElement.scrollTo({ top: containerElement.scrollHeight, behavior });
  } else if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
    const scrollHeight =
      typeof document !== "undefined"
        ? document.documentElement?.scrollHeight || document.body?.scrollHeight || 0
        : 0;
    window.scrollTo({ top: scrollHeight, behavior });
  }
}

export function scrollToTargetTop(
  topRef: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null,
  containerRef: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | null,
  behavior: ScrollBehavior
) {
  const topElement = topRef?.current;
  const containerElement = containerRef?.current;

  if (topElement && typeof topElement.scrollIntoView === "function") {
    topElement.scrollIntoView({ behavior, block: "start", inline: "nearest" });
  } else if (containerElement && typeof containerElement.scrollTo === "function") {
    containerElement.scrollTo({ top: 0, behavior });
  } else if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
    window.scrollTo({ top: 0, behavior });
  }
}
