# react-top-bottom-scroll

> A lightweight, accessible, high-performance scroll-to-top and scroll-to-bottom button component for React (React 16.8+, 17, 18, 19+).

[![npm version](https://img.shields.io/npm/v/react-top-bottom-scroll.svg)](https://www.npmjs.com/package/react-top-bottom-scroll)
[![license](https://img.shields.io/npm/l/react-top-bottom-scroll.svg)](https://github.com/Ariful4593/react-top-bottom-scroll/blob/main/LICENSE)

## Features

- **Universal React Compatibility**: Fully supports React 16.8+, 17, 18, 19 and future versions.
- **TypeScript First**: Ships with full TypeScript definitions out of the box.
- **High Performance**: Uses `requestAnimationFrame` and passive scroll listeners to prevent scroll lag and layout thrashing.
- **Accessible (`a11y`)**: Built using `<button type="button">` with proper `aria-label` attributes.
- **Smooth Scrolling**: Smoothly animates scrolling to top, bottom, or targeted DOM elements via `ref`.
- **Customizable**: Override icons, colors, tooltips, inline styles, and class names easily.

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

### Basic Usage

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

---

### Scroll to Specific Element (`ref`)

```tsx
import React, { useRef } from "react";
import ScrollUpDown from "react-top-bottom-scroll";

function App() {
  const topSectionRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div ref={topSectionRef}>Header Content</div>
      
      {/* ... Content ... */}

      <div ref={bottomSectionRef}>Footer Content</div>

      <ScrollUpDown topRef={topSectionRef} bottomRef={bottomSectionRef} />
    </div>
  );
}
```

---

### Custom Icons & Styling

```tsx
import React from "react";
import ScrollUpDown from "react-top-bottom-scroll";

function App() {
  return (
    <ScrollUpDown
      upIconColor="#ffffff"
      downIconColor="#ffffff"
      style={{ backgroundColor: "#2563eb", borderRadius: "8px" }}
      renderIcon={(direction) => (
        <span>{direction === "up" ? "⬆️ Top" : "⬇️ Bottom"}</span>
      )}
    />
  );
}
```

---

## Props Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `bottomRef` | `React.RefObject<HTMLElement>` | `null` | Target element reference to scroll down to. |
| `topRef` | `React.RefObject<HTMLElement>` | `null` | Target element reference to scroll up to. |
| `upIconColor` | `string` | `"white"` | Fill color of the up arrow SVG icon. |
| `downIconColor` | `string` | `"white"` | Fill color of the down arrow SVG icon. |
| `upTitleMessage` | `string` | `"Scroll to top"` | Tooltip and `aria-label` text when scrolling up. |
| `downTitleMessage` | `string` | `"Scroll to bottom"` | Tooltip and `aria-label` text when scrolling down. |
| `style` | `React.CSSProperties` | `{}` | Custom inline CSS styles for the button container. |
| `className` | `string` | `""` | Custom CSS class names to apply to the button. |
| `renderIcon` | `(direction: "up" \| "down") => React.ReactNode` | `null` | Custom icon render callback based on scroll direction. |

---

## License

MIT © [Ariful Islam](https://github.com/Ariful4593)
