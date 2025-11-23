# react-lite-hooks

A **lightweight set of production-ready React hooks** for common UI needs — without extra dependencies.  
Save time by eliminating boilerplate for persistent state, clipboard utilities, media queries, viewport detection, and more.

---

## Features

- **10 essential hooks in one package**
- **TypeScript support** out of the box
- **Tiny, tree-shakeable** build (ESM + types)
- **React 16.8+** (hooks API only)

---

## Installation

```bash
npm install react-lite-hooks
# or
yarn add react-lite-hooks
# or
pnpm add react-lite-hooks
```

---

### Note: React and ReactDOM are peer dependencies and will not be bundled

## Hooks Overview

### 1. usePersistentState

#### State that survives page reloads using localStorage

```tsx
import { usePersistentState } from "react-lite-hooks";

function App() {
  const [name, setName] = usePersistentState("name", "");
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
    />
  );
}
```

### 2. useClipboard

#### Copy text to the clipboard and track its copied state

```tsx
import { useClipboard } from "react-lite-hooks";

function CopyButton() {
  const { copy, copied } = useClipboard();
  return (
    <button onClick={() => copy("Hello world!")}>
      {copied ? "Copied!" : "Copy text"}
    </button>
  );
}
```

### 3. useMediaQuery

#### Track whether a CSS media query currently matches

```tsx
import { useMediaQuery } from "react-lite-hooks";

function Component() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return <p>{isDesktop ? "Desktop view" : "Mobile view"}</p>;
}
```

### 4. useOnScreen

#### Detect when an element is visible in the viewport using the Intersection Observer API

```tsx
import { useRef } from "react";
import { useOnScreen } from "react-lite-hooks";

function LazyImage({ src }: { src: string }) {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, { rootMargin: "-50px" });
  return <img ref={ref} src={isVisible ? src : undefined} alt="" />;
}
```

### 5. useToggle

#### A simple hook to manage boolean state — no more repetitive setState(!state) logic

```tsx
import { useToggle } from "react-lite-hooks";

function ToggleExample() {
  const [isOpen, toggleOpen, setOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggleOpen}>
        {isOpen ? "Close Panel" : "Open Panel"}
      </button>

      {isOpen && (
        <div>
          <p>Panel content here.</p>
          <button onClick={() => setOpen(false)}>Force Close</button>
        </div>
      )}
    </div>
  );
}
```

### 6. useDebounce

#### Delays updating a value until a specified time has passed. Perfect for search inputs.

```tsx
import { useState, useEffect } from "react";
import { useDebounce } from "react-lite-hooks";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Trigger API call here
      console.log("Searching for:", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return <input onChange={(e) => setSearchTerm(e.target.value)} />;
}
```

### 7. useOnClickOutside

#### Detects clicks outside of a specified element. Essential for modals and dropdowns.

```tsx
import { useRef, useState } from "react";
import { useOnClickOutside } from "react-lite-hooks";

function Modal() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  useOnClickOutside(ref, () => setIsOpen(false));

  if (!isOpen) return null;

  return (
    <div ref={ref} style={{ border: "1px solid black", padding: 20 }}>
      Click outside to close me
    </div>
  );
}
```

### 8. useWindowSize

#### Tracks the dimensions of the browser window.

```tsx
import { useWindowSize } from "react-lite-hooks";

function ShowSize() {
  const { width, height } = useWindowSize();
  return (
    <p>
      Window size: {width} x {height}
    </p>
  );
}
```

### 9. usePrevious

#### Access the previous value of a state or prop.

```tsx
import { useState } from "react";
import { usePrevious } from "react-lite-hooks";

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>
        Now: {count}, before: {prevCount}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### 10. useEventListener

#### Safe and easy event listener management.

```tsx
import { useEventListener } from "react-lite-hooks";

function App() {
  useEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      console.log("Escape pressed!");
    }
  });

  return <div>Press Escape</div>;
}
```

## Requirements

### React 16.8+ (hooks support)

### Any modern bundler: Vite, Next.js, CRA, Webpack
