import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollUpDown, useScrollProgress } from "../index";

describe("useScrollUpDown & useScrollProgress Hooks", () => {
  const triggerScroll = (scrollY: number) => {
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: scrollY,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, "pageYOffset", {
        value: scrollY,
        writable: true,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });
  };

  beforeEach(() => {
    vi.restoreAllMocks();

    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get: () => 5000,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      get: () => 1000,
    });

    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 1000, writable: true, configurable: true });
  });

  it("initializes with default state at top of page", () => {
    const { result } = renderHook(() => useScrollUpDown());

    expect(result.current.isAtTop).toBe(true);
    expect(result.current.isAtBottom).toBe(false);
    expect(result.current.scrollProgress).toBe(0);
    expect(result.current.scrollDirection).toBeNull();
  });

  it("updates scrollDirection and progress when scrolling down", () => {
    const { result } = renderHook(() => useScrollUpDown({ showAtThreshold: 50 }));

    triggerScroll(2000);

    expect(result.current.scrollDirection).toBe("down");
    expect(result.current.isAtTop).toBe(false);
    expect(result.current.scrollProgress).toBe(50); // 2000 / (5000 - 1000) = 50%
  });

  it("updates scrollDirection to up when scrolling upwards", () => {
    const { result } = renderHook(() => useScrollUpDown({ showAtThreshold: 50 }));

    triggerScroll(3000);
    expect(result.current.scrollDirection).toBe("down");

    triggerScroll(2000);
    expect(result.current.scrollDirection).toBe("up");
  });

  it("triggers scrollToTop and scrollToBottom functions", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const { result } = renderHook(() => useScrollUpDown());

    act(() => {
      result.current.scrollToTop();
    });
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });

    act(() => {
      result.current.scrollToBottom();
    });
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 5000, behavior: "smooth" });
  });

  it("tracks progress with useScrollProgress hook", () => {
    const { result } = renderHook(() => useScrollProgress());

    triggerScroll(1000); // 1000 / 4000 = 25%

    expect(result.current.scrollProgress).toBe(25);
    expect(result.current.currentScrollY).toBe(1000);
  });
});
