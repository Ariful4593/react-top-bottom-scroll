import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import ScrollUpDown from "../ScrollUpDown";

describe("ScrollUpDown Component", () => {
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

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb: FrameRequestCallback) => {
      cb(performance.now());
      return 1;
    });

    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get: () => 5000,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      get: () => 800,
    });

    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 800, writable: true, configurable: true });
  });

  it("does not render when not scrolled", () => {
    const { container } = render(<ScrollUpDown />);
    expect(container.querySelector("button")).toBeNull();
  });

  it("renders scroll down button when scrolling down in dynamic mode", () => {
    render(
      <ScrollUpDown
        downTitleMessage="Scroll to end"
        style={{ backgroundColor: "rgb(0, 0, 255)" }}
      />
    );

    triggerScroll(200);

    const btn = screen.getByRole("button", { name: "Scroll to end" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveStyle({ backgroundColor: "rgb(0, 0, 255)" });
  });

  it("renders custom icon using renderIcon callback", () => {
    render(
      <ScrollUpDown
        renderIcon={(direction, progress) => (
          <span data-testid="custom-icon">{direction === "down" ? `DOWN ${progress}%` : "UP"}</span>
        )}
      />
    );

    triggerScroll(200);

    const icon = screen.getByTestId("custom-icon");
    expect(icon).toHaveTextContent("DOWN");
  });

  it("calls window.scrollTo top when up button is clicked and triggers callback", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const onTopMock = vi.fn();

    render(<ScrollUpDown upTitleMessage="Go Up" onScrollToTop={onTopMock} />);

    // Scroll down first
    triggerScroll(500);

    // Then scroll up
    triggerScroll(300);

    const btn = screen.getByRole("button", { name: "Go Up" });
    expect(btn).toBeInTheDocument();
    btn.click();

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    expect(onTopMock).toHaveBeenCalled();
  });

  it("calls scrollIntoView when topRef is provided", () => {
    const scrollIntoViewMock = vi.fn();
    const mockRef = {
      current: { scrollIntoView: scrollIntoViewMock } as unknown as HTMLElement,
    };

    render(<ScrollUpDown topRef={mockRef} upTitleMessage="Go to top ref" />);

    triggerScroll(500);
    triggerScroll(300);

    const btn = screen.getByRole("button", { name: "Go to top ref" });
    expect(btn).toBeInTheDocument();
    btn.click();

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });

  it("renders progress ring when showProgress is true", () => {
    render(<ScrollUpDown showProgress={true} progressColor="#ef4444" />);
    triggerScroll(500);

    const btn = screen.getByRole("button");
    const progressRing = btn.querySelector(".react-scroll-up-down-progress-ring");
    expect(progressRing).toBeInTheDocument();
  });

  it("applies position class when position prop is set", () => {
    render(<ScrollUpDown position="bottom-left" />);
    triggerScroll(200);

    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("react-scroll-up-down-btn--bottom-left");
  });

  it("respects custom showAtThreshold", () => {
    const { container } = render(<ScrollUpDown showAtThreshold={300} />);

    triggerScroll(150);
    expect(container.querySelector("button")).toBeNull();

    triggerScroll(350);
    triggerScroll(400);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("triggers onScrollChange callback", () => {
    const onScrollChangeMock = vi.fn();
    render(<ScrollUpDown onScrollChange={onScrollChangeMock} />);

    triggerScroll(420);
    expect(onScrollChangeMock).toHaveBeenCalledWith("down", expect.any(Number));
  });

  /* New Tests for Multi-mode & Reading Progress Bar */

  it("renders reading progress bar when showProgressBar is true", () => {
    const { container } = render(
      <ScrollUpDown
        showProgressBar={true}
        progressBarPosition="top"
        progressBarColor="#10b981"
      />
    );

    const bar = container.querySelector(".react-scroll-reading-bar--top");
    expect(bar).toBeInTheDocument();

    const indicator = container.querySelector(".react-scroll-reading-bar-indicator");
    expect(indicator).toHaveStyle({ background: "#10b981" });
  });

  it("renders both buttons when mode is dual", () => {
    render(
      <ScrollUpDown
        mode="dual"
        dualLayout="vertical"
        upTitleMessage="Go to top"
        downTitleMessage="Go to bottom"
      />
    );

    triggerScroll(500);

    const topBtn = screen.getByRole("button", { name: "Go to top" });
    const bottomBtn = screen.getByRole("button", { name: "Go to bottom" });

    expect(topBtn).toBeInTheDocument();
    expect(bottomBtn).toBeInTheDocument();
  });

  it("renders only up button when mode is up-only", () => {
    render(
      <ScrollUpDown
        mode="up-only"
        upTitleMessage="Only Top"
      />
    );

    triggerScroll(500);

    const btn = screen.getByRole("button", { name: "Only Top" });
    expect(btn).toBeInTheDocument();
  });

  it("renders only down button when mode is down-only", () => {
    render(
      <ScrollUpDown
        mode="down-only"
        downTitleMessage="Only Bottom"
      />
    );

    triggerScroll(100);

    const btn = screen.getByRole("button", { name: "Only Bottom" });
    expect(btn).toBeInTheDocument();
  });
});
