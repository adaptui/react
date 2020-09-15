## The Goal

Create a Link component to properly apply aria attributes and keyboard
navigation for the elements other than html `a` tag.

By Default, Link component renders an `a` tag which uses `useClickable` hook. As
per the nature of `useClickable`, it doesn't change the native link `a` tags
behaviour.

## Key Features

- Applies `role: link` when the element is not a native link - `a` tag.
- Adds all `useClickable` features with keyboard navigation and
  `unstable_clickOnSpace: false`.
- Returns `{ target: "_blank", rel: "noopener noreferrer" }` when `isExternal`.

## Options

- `isExternal` - Returns `{ target: "_blank", rel: "noopener noreferrer" }`

## API

```jsx
<Link href="https://reakit.io/" isExternal>
  Link
</Link>
```

```jsx
<Link as="span" onClick="() => window.location.href = 'https://reakit.io/'">
  Custom Link
</Link>
```

## Complete Implementation & Example

- Implementation Details -
  https://github.com/timelessco/renderless-components/blob/master/src/link/Link.ts
- Storybook -
  https://renderless-components.netlify.app/?path=/story/component-link-reakit--default
