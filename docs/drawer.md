# Drawer

`Drawer` component was built on top of [Dialog](https://reakit.io/docs/dialog/)
component to provide the drawer ability from four ends. It follows the
[Dialog Accessibility](https://reakit.io/docs/dialog/#accessibility) features.

## Table of Contents

- [Usage](#usage)
- [Composition](#composition)
- [Props](#props)
  - [`Drawer`](#drawer)
  - [`DrawerCloseButton`](#drawerclosebutton)

## Usage

```js
import React from "react";
import { css } from "@emotion/css";

import {
  Drawer,
  useDrawerState,
  DrawerBackdrop,
  DrawerCloseButton,
  DrawerDisclosure,
} from "@renderlesskit/react";

export const App = () => {
  const dialog = useDrawerState({ animated: true });
  const inputRef = React.useRef(null);
  const [placement, setPlacement] = React.useState("left");

  return (
    <div>
      <DrawerDisclosure {...dialog}>Open Drawer</DrawerDisclosure>
      <select
        defaultValue={placement}
        onBlur={e => setPlacement(e.target.value)}
      >
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="right">Right</option>
        <option value="left">Left</option>
      </select>
      <DrawerBackdrop className={backdropStyles} {...dialog}>
        <Drawer
          {...dialog}
          placement={placement}
          aria-label="Hello world"
          style={{ color: "red" }}
          className={css`
            opacity: 0;
            padding: 10px;
            background-color: white;
            transition: 250ms ease-in-out;
            transform: ${cssTransforms[placement]};
            &[data-enter] {
              opacity: 1;
              transform: translate(0, 0);
            }
          `}
          unstable_initialFocusRef={inputRef}
        >
          <DrawerCloseButton {...dialog}>X</DrawerCloseButton>
          <p>Welcome to Reakit!</p>
          <input ref={inputRef} />
        </Drawer>
      </DrawerBackdrop>
    </div>
  );
};

export default App;

const backdropStyles = css`
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: opacity 250ms ease-in-out;
  background-color: rgba(0, 0, 0, 0.2);
  &[data-enter] {
    opacity: 1;
  }
`;

const cssTransforms = {
  top: "translate(0, -200px)",
  bottom: "translate(0, 200px)",
  left: "translate(-200px, 0)",
  right: "translate(200px, 0)",
};
```

[Drawer - Open On Sandbox](https://codesandbox.io/s/q9njc)

## Composition

- Drawer uses [useDialog](https://reakit.io/docs/dialog/)
- DrawerCloseButton uses [useDialogDisclosure](https://reakit.io/docs/dialog/)

## Props

### `Drawer`

| Name                                                                | type                                                     | Description                                                                                                                                                                                                                                                           |
| :------------------------------------------------------------------ | :------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------- | --- |
| **`baseId`**                                                        | <code>string</code>                                      | ID that will serve as a base for all the items IDs.                                                                                                                                                                                                                   |
| **`visible`**                                                       | <code>boolean</code>                                     | Whether it's visible or not.                                                                                                                                                                                                                                          |
| **`animating`**                                                     | <code>boolean</code>                                     | Whether it's animating or not.                                                                                                                                                                                                                                        |
| **`animated`**                                                      | <code>number \| boolean</code>                           | If `true`, `animating` will be set to `true` when `visible` is updated.It'll wait for `stopAnimation` to be called or a CSS transition ends.If `animated` is set to a `number`, `stopAnimation` will be called onlyafter the same number of milliseconds have passed. |
| **`stopAnimation`**                                                 | <code>() =&#62; void</code>                              | Stops animation. It's called automatically if there's a CSS transition.                                                                                                                                                                                               |
| **`modal`**                                                         | <code>boolean</code>                                     | Toggles Dialog's `modal` state. - Non-modal: `preventBodyScroll` doesn't work and focus is free. - Modal: `preventBodyScroll` is automatically enabled, focus istrapped within the dialog and the dialog is rendered within a `Portal`by default.                     |
| **`hide`**                                                          | <code>() =&#62; void</code>                              | Changes the `visible` state to `false`                                                                                                                                                                                                                                |
| **`hideOnEsc`**                                                     | <code>boolean \| undefined</code>                        | When enabled, user can hide the dialog by pressing `Escape`.                                                                                                                                                                                                          |
| **`hideOnClickOutside`**                                            | <code>boolean \| undefined</code>                        | When enabled, user can hide the dialog by clicking outside it.                                                                                                                                                                                                        |
| **`preventBodyScroll`**                                             | <code>boolean \| undefined</code>                        | When enabled, user can't scroll on body when the dialog is visible.This option doesn't work if the dialog isn't modal.                                                                                                                                                |
| **`unstable_initialFocusRef`** <span title="Experimental">⚠️</span> | <code>RefObject&#60;HTMLElement&#62; \| undefined</code> | The element that will be focused when the dialog shows.When not set, the first tabbable element within the dialog will be used.                                                                                                                                       |
| **`unstable_finalFocusRef`** <span title="Experimental">⚠️</span>   | <code>RefObject&#60;HTMLElement&#62; \| undefined</code> | The element that will be focused when the dialog hides.When not set, the disclosure component will be used.                                                                                                                                                           |
| **`unstable_orphan`** <span title="Experimental">⚠️</span>          | <code>boolean \| undefined</code>                        | Whether or not the dialog should be a child of its parent.Opening a nested orphan dialog will close its parent dialog if`hideOnClickOutside` is set to `true` on the parent.It will be set to `false` if `modal` is `false`.                                          |
| **`placement`**                                                     | <code>&#34;left&#34; \| &#34;right&#34;                  | &#34;top&#34;                                                                                                                                                                                                                                                         | &#34;bottom&#34; | undefined</code> |     |

### `DrawerCloseButton`

| Name            | type                              | Description                                                                                                                                                  |
| :-------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**  | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`** | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |
| **`visible`**   | <code>boolean</code>              | Whether it's visible or not.                                                                                                                                 |
| **`baseId`**    | <code>string</code>               | ID that will serve as a base for all the items IDs.                                                                                                          |
| **`toggle`**    | <code>() =&#62; void</code>       | Toggles the `visible` state                                                                                                                                  |
