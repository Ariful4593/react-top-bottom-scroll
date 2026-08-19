# react-top-bottom-scroll

> A lightweight, highly customizable, accessible, high-performance scroll-to-top and scroll-to-bottom button component and headless React hooks (React 16.8+, 17, 18, 19+).

[![npm version](https://img.shields.io/npm/v/react-top-bottom-scroll.svg)](https://www.npmjs.com/package/react-top-bottom-scroll)
[![license](https://img.shields.io/npm/l/react-top-bottom-scroll.svg)](https://github.com/Ariful4593/react-top-bottom-scroll/blob/main/LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live--sandbox-brightgreen)](https://Ariful4593.github.io/react-top-bottom-scroll/)

> 🚀 **[Try the Live Interactive Demo Sandbox](https://Ariful4593.github.io/react-top-bottom-scroll/)**

## Features

- **Universal React Compatibility**: Fully supports React 16.8+, 17, 18, 19 and future versions.
- **TypeScript First**: Ships with complete TypeScript definitions.
- **Multiple Modes**: Support for `dynamic` (smart direction switcher), `dual` (both Up & Down buttons), `up-only`, and `down-only`.
- **Top / Bottom Reading Progress Bar**: Optional linear reading progress bar across the screen or container.
- **Circular Progress Ring**: Optional SVG circular progress ring showing 0–100% scroll progress.
- **Headless React Hooks**: Exported `useScrollUpDown` and `useScrollProgress` hooks for complete UI and Tailwind CSS customization.
- **Custom Container Support**: Works with `window` as well as any scrollable `<div>` container via `containerRef`.
- **Auto-Hide Inactivity**: Automatically fades out button when scrolling stops.
- **Flexible Positioning & Layout**: Position presets (`bottom-right`, `bottom-left`, `bottom-center`) and dual layouts (`vertical`, `horizontal`).
- **High Performance**: Passive scroll listeners to prevent scroll lag and layout thrashing.
- **Accessible (`a11y`)**: Built using `<button type="button">` with proper `aria-label` attributes.

---

## Installation

```bash
npm install react-top-bottom-scroll
# or
yarn add react-top-bottom-scroll
# or
pnpm add react-top-bottom-scroll
```

---

## Quick Start

### 1. Basic Usage

```tsx
import React from "react";
import ScrollUpDown from "react-top-bottom-scroll";

function App() {
  return (
    <div>
      <h1>My Long Page</h1>
      {/* ... Content ... */}
      
      {/* Floating Scroll Button */}
      <ScrollUpDown />
    </div>
  );
}

export default App;
```

> **Note for Next.js App Router (Next.js 13/14/15+)**:
> Since `ScrollUpDown` listens to browser scroll events, place `"use client";` at the top of the component file where you import `ScrollUpDown`.

---

### TypeScript Usage & Imported Types

```tsx
import ScrollUpDown, {
  useScrollUpDown,
  useScrollProgress,
  type ScrollUpDownProps,
  type ScrollDirection,
  type ButtonPosition,
  type ScrollMode,
  type DualLayout,
  type ProgressBarPosition,
  type UseScrollUpDownOptions,
  type UseScrollUpDownReturn,
} from "react-top-bottom-scroll";
```

---

### 2. Multi-Mode Support (`dynamic`, `dual`, `up-only`, `down-only`)

#### Dual Buttons Stack (Both Up & Down):
```tsx
<ScrollUpDown
  mode="dual"
  dualLayout="vertical" // "vertical" | "horizontal"
  dualGap={8}
  showProgress={true}
  progressColor="#3b82f6"
/>
```

#### Up-Only (Classic Scroll to Top):
```tsx
<ScrollUpDown mode="up-only" position="bottom-right" />
```

#### Down-Only (Scroll to Bottom / Comments):
```tsx
<ScrollUpDown mode="down-only" position="bottom-right" />
```

---

### 3. Horizontal Reading Progress Bar

Add a sleek linear reading progress bar across the top or bottom of the viewport:

```tsx
<ScrollUpDown
  showProgressBar={true}
  progressBarPosition="top" // "top" | "bottom"
  progressBarHeight={4}     // or "4px"
  progressBarColor="linear-gradient(90deg, #3b82f6, #8b5cf6)"
  progressBarTrackColor="transparent"
/>
```

---

### 4. Circular Scroll Progress Ring

```tsx
<ScrollUpDown
  showProgress={true}
  progressColor="#3b82f6"
  progressTrackColor="rgba(255, 255, 255, 0.2)"
  progressStrokeWidth={3}
/>
```

---

### 5. Custom Scroll Container (`containerRef`)

Track scroll progress inside a scrollable `<div>` modal or sidebar instead of `window`:

```tsx
import React, { useRef } from "react";
import ScrollUpDown from "react-top-bottom-scroll";

function ScrollableModal() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} style={{ height: "400px", overflowY: "auto", position: "relative" }}>
      {/* ... Long Modal Content ... */}
      <ScrollUpDown
        containerRef={containerRef}
        mode="dual"
        dualLayout="horizontal"
        showProgressBar={true}
      />
    </div>
  );
}
```

---

### 6. Headless React Hook (`useScrollUpDown` & `useScrollProgress`)

Create completely custom UI with Tailwind CSS or any design system without using default button styles:

```tsx
import React from "react";
import { useScrollUpDown } from "react-top-bottom-scroll";

function CustomFloatingPill() {
  const {
    scrollProgress,
    scrollDirection,
    isAtTop,
    isAtBottom,
    scrollToTop,
    scrollToBottom,
  } = useScrollUpDown({ showAtThreshold: 20 });

  return (
    <div className="fixed bottom-6 right-6 bg-slate-900 text-white rounded-full px-4 py-2 flex items-center gap-3 shadow-xl">
      <span>{Math.round(scrollProgress)}%</span>
      <button
        onClick={() => scrollToTop()}
        disabled={isAtTop}
        className="px-2 py-1 bg-blue-600 rounded disabled:opacity-40"
      >
        ▲
      </button>
      <button
        onClick={() => scrollToBottom()}
        disabled={isAtBottom}
        className="px-2 py-1 bg-blue-600 rounded disabled:opacity-40"
      >
        ▼
      </button>
    </div>
  );
}
```

---

### 7. Auto-Hide & Custom Positioning

```tsx
<ScrollUpDown
  position="bottom-left"
  autoHide={true}
  autoHideDelay={3000}
  showAtThreshold={200}
/>
```

---

## Props Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `"dynamic" \| "dual" \| "up-only" \| "down-only"` | `"dynamic"` | Operation mode: smart direction switcher, dual buttons, up-only, or down-only. |
| `dualLayout` | `"vertical" \| "horizontal"` | `"vertical"` | Layout direction when `mode="dual"`. |
| `dualGap` | `number \| string` | `8` | Gap spacing between dual buttons. |
| `showProgressBar` | `boolean` | `false` | Enables linear reading progress bar across the screen/container. |
| `progressBarPosition` | `"top" \| "bottom"` | `"top"` | Position of the reading progress bar. |
| `progressBarHeight` | `number \| string` | `3` | Height in px or CSS value for reading progress bar. |
| `progressBarColor` | `string` | `"#3b82f6"` | Color or CSS gradient background for reading progress bar. |
| `progressBarTrackColor` | `string` | `"transparent"` | Background track color for reading progress bar. |
| `progressBarZIndex` | `number` | `10002` | Z-index for reading progress bar. |
| `bottomRef` | `React.RefObject<HTMLElement>` | `null` | Target element to scroll down to. |
| `topRef` | `React.RefObject<HTMLElement>` | `null` | Target element to scroll up to. |
| `containerRef` | `React.RefObject<HTMLElement>` | `null` | Custom scrollable `<div>` container ref. |
| `showProgress` | `boolean` | `false` | Renders a circular SVG scroll progress ring around button. |
| `progressColor` | `string` | `"#3b82f6"` | Stroke color of active scroll progress ring. |
| `progressTrackColor` | `string` | `"rgba(255,255,255,0.2)"` | Background track stroke color of progress ring. |
| `progressStrokeWidth` | `number` | `3` | Stroke width in px for progress ring. |
| `position` | `"bottom-right" \| "bottom-left" \| "bottom-center"` | `"bottom-right"` | Position preset for the floating button. |
| `showAtThreshold` | `number` | `10` | Minimum scroll distance in px before button appears. |
| `autoHide` | `boolean` | `false` | Auto-hides button after a period of scroll inactivity. |
| `autoHideDelay` | `number` | `3000` | Inactivity delay in ms before hiding button. |
| `smoothScroll` | `boolean` | `true` | Enables smooth (`true`) or instant (`false`) scrolling. |
| `upIconColor` | `string` | `"white"` | Fill color of the up arrow SVG icon. |
| `downIconColor` | `string` | `"white"` | Fill color of the down arrow SVG icon. |
| `upTitleMessage` | `string` | `"Scroll to top"` | Tooltip and `aria-label` text when scrolling up. |
| `downTitleMessage` | `string` | `"Scroll to bottom"` | Tooltip and `aria-label` text when scrolling down. |
| `style` | `React.CSSProperties` | `{}` | Custom inline CSS styles for the button container. |
| `className` | `string` | `""` | Custom CSS class names to apply to the button. |
| `renderIcon` | `(direction: "up" \| "down", progress: number) => React.ReactNode` | `null` | Custom icon render callback based on scroll direction & %. |
| `onScrollToTop` | `() => void` | `undefined` | Callback fired when user scrolls to top via button. |
| `onScrollToBottom` | `() => void` | `undefined` | Callback fired when user scrolls to bottom via button. |
| `onScrollChange` | `(direction: "up" \| "down" \| null, progress: number) => void` | `undefined` | Callback fired when scroll state or progress changes. |

---

## License

MIT © [Ariful Islam](https://github.com/Ariful4593)
