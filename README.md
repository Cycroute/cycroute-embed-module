# cycroute-embed-module

React component for embedding Cycroute iframes with a built-in loading animation.

## Installation

```bash
npm install cycroute-embed-module
```

React 16.8 or later is required as a peer dependency.

## Usage

```tsx
import { IframeWithLoader } from 'cycroute-embed-module';

function App() {
  return (
    <IframeWithLoader src="https://example.com/embed/route/123" />
  );
}
```

## Size

The display size is determined automatically based on the `src` URL.

| URL pattern | Width | Height |
|---|---|---|
| Contains `/small` | 300px | 116px |
| Otherwise | 400px | 156px |

```tsx
// Default size (400×156)
<IframeWithLoader src="https://example.com/embed/route/123" />

// Small size (300×116)
<IframeWithLoader src="https://example.com/embed/route/123/small" />
```

You can override the size via the `style` prop.

```tsx
<IframeWithLoader src="..." style={{ width: '100%', height: '200px' }} />
```

## Props

Accepts all standard `<iframe>` attributes.

| Prop | Type | Description |
|---|---|---|
| `src` | `string` | URL of the iframe |
| `style` | `React.CSSProperties` | Optional style overrides |
| others | — | All standard `<iframe>` attributes |

## Requirements

- React >= 16.8.0

## Repository

https://github.com/Cycroute/cycroute-embed-module
