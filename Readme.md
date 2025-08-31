# react-lite-hooks

A **lightweight set of production-ready React hooks** for common UI needs — without extra dependencies.  
Save time by eliminating boilerplate for persistent state, clipboard utilities, media queries, and viewport detection.

---

## Features

- **4 essential hooks in one package**
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

### 1. usePersistentState:-

#### State that survives page reloads using localStorage

```bash
    import { usePersistentState } from "react-lite-hooks";
    function App() {
    const [name, setName] = usePersistentState("name", "");
    return (
        <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name"
        />
    );
    }
```

### 2. useClipboard

#### Copy text to the clipboard and track its copied state

```bash
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

```bash
    import { useMediaQuery } from "react-lite-hooks";
    function Component() {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    return <p>{isDesktop ? "Desktop view" : "Mobile view"}</p>;
    }
```

### 4. useOnScreen

#### Detect when an element is visible in the viewport using the Intersection Observer API

```bash
    import { useRef } from "react";
    import { useOnScreen } from "react-lite-hooks";
    function LazyImage({ src }: { src: string }) {
    const ref = useRef(null);
    const isVisible = useOnScreen(ref, "-50px");
    return <img ref={ref} src={isVisible ? src : undefined} alt="" />;
    }
```

## Requirements

### React 16.8+ (hooks support)

### Any modern bundler: Vite, Next.js, CRA, Webpack
