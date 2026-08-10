# react-top-bottom-scroll

> A lightweight, highly customizable, accessible, high-performance scroll-to-top and scroll-to-bottom button component for React (React 16.8+, 17, 18, 19+).

[![npm version](https://img.shields.io/npm/v/react-top-bottom-scroll.svg)](https://www.npmjs.com/package/react-top-bottom-scroll)
[![license](https://img.shields.io/npm/l/react-top-bottom-scroll.svg)](https://github.com/Ariful4593/react-top-bottom-scroll/blob/main/LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live--sandbox-brightgreen)](https://Ariful4593.github.io/react-top-bottom-scroll/)

> 🚀 **[Try the Live Interactive Demo Sandbox](https://Ariful4593.github.io/react-top-bottom-scroll/)**

## Features

- **Universal React Compatibility**: Fully supports React 16.8+, 17, 18, 19 and future versions.
- **TypeScript First**: Ships with complete TypeScript definitions.
- **Circular Progress Ring**: Optional SVG progress ring showing 0–100% scroll progress.
- **Custom Container Support**: Works with `window` as well as any scrollable `<div>` container via `containerRef`.
- **Auto-Hide Inactivity**: Automatically fades out button when scrolling stops.
- **Threshold Control**: Configure scroll distance before button appears (`showAtThreshold`).
- **Flexible Positioning**: Position presets (`bottom-right`, `bottom-left`, `bottom-center`).
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
  type ScrollUpDownProps,
  type ScrollDirection,
  type ButtonPosition,
} from "react-top-bottom-scroll";
```

---

### 2. Circular Scroll Progress Ring

```tsx
import React from "react";
import ScrollUpDown from "react-top-bottom-scroll";

function App() {
  return (
    <ScrollUpDown
      showProgress={true}
      progressColor="#3b82f6"
      progressTrackColor="rgba(255, 255, 255, 0.2)"
      progressStrokeWidth={3}
    />
  );
}
```

---

### 3. Custom Scroll Container (`containerRef`)

Track scroll progress inside a scrollable `<div>` modal or sidebar instead of `window`:

```tsx
import React, { useRef } from "react";
import ScrollUpDown from "react-top-bottom-scroll";

function ScrollableModal() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} style={{ height: "400px", overflowY: "auto" }}>
      {/* ... Long Modal Content ... */}
      <ScrollUpDown containerRef={containerRef} position="bottom-right" />
    </div>
  );
}
```

---

### 4. Auto-Hide & Custom Positioning

```tsx
import React from "react";
import ScrollUpDown from "react-top-bottom-scroll";

function App() {
  return (
    <ScrollUpDown
      position="bottom-left"
      autoHide={true}
      autoHideDelay={3000}
      showAtThreshold={200}
    />
  );
}
```

---

### 5. Callbacks & Custom Icons

```tsx
import React from "react";
import ScrollUpDown from "react-top-bottom-scroll";

function App() {
  return (
    <ScrollUpDown
      onScrollToTop={() => console.log("User scrolled to top!")}
      onScrollChange={(dir, progress) => console.log(`Scrolling ${dir}, ${progress}%`)}
      renderIcon={(direction, progress) => (
        <span>{direction === "up" ? `⬆️ ${progress}%` : `⬇️ ${progress}%`}</span>
      )}
    />
  );
}
```

---

## Props Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
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
