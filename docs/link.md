# Link

`Link` component that provides the required aria role when used under different
compositions. It follows the
[WAI-ARIA Link Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/) for
[keyboard interactions](https://www.w3.org/WAI/ARIA/apg/patterns/link/#:~:text=and%20img%20elements.-,Keyboard%20Interaction,-Enter)
and
[accessibilty properties](https://www.w3.org/WAI/ARIA/apg/patterns/link/#:~:text=for%20the%20link.-,WAI%2DARIA%20Roles%2C%20States%2C%20and%20Properties,-The%20element%20containing)

## Table of Contents

- [Usage](#usage)
- [Other Examples](#other-examples)
- [Composition](#composition)
- [Props](#props)
  - [`LinkOptions`](#linkoptions)

## Usage

```js
import * as React from "react";

import { Link } from "@adaptui/react";

export const LinkBasic = props => {
  return (
    <Link href="https://timeless.co/" isExternal {...props}>
      Timeless
    </Link>
  );
};

export default LinkBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Link-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/4t3mje)
[![Edit CodeSandbox](https://img.shields.io/badge/Link%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/zsq50u)

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/Link%20Span-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/3x1exr)
[![Edit CodeSandbox](https://img.shields.io/badge/Link%20Span%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/ufcpss)

## Composition

- Link uses `useCommand`

## Props

### `LinkOptions`

| Name             | Type                              | Description                 |
| :--------------- | :-------------------------------- | :-------------------------- |
| **`isExternal`** | <code>boolean \| undefined</code> | Opens the link in a new tab |

<details><summary>CommandOptions props</summary>
> These props are returned by the other props You can also provide these props.

| Name                         | Type                                                                                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**               | <code>boolean \| undefined</code>                                                                                                                              | Determines whether the focusable element is disabled. If the focusableelement doesn't support the native `disabled` attribute, the`aria-disabled` attribute will be used instead.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **`autoFocus`**              | <code>boolean \| undefined</code>                                                                                                                              | Automatically focus the element when it is mounted. It works similarly tothe native `autoFocus` prop, but solves an issue where the element isgiven focus before React effects can run.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **`focusable`**              | <code>boolean \| undefined</code>                                                                                                                              | Whether the element should be focusable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`accessibleWhenDisabled`** | <code>boolean \| undefined</code>                                                                                                                              | Determines whether the element should be focusable even when it isdisabled.This is important when discoverability is a concern. For example:> A toolbar in an editor contains a set of special smart paste functionsthat are disabled when the clipboard is empty or when the function is notapplicable to the current content of the clipboard. It could be helpful tokeep the disabled buttons focusable if the ability to discover theirfunctionality is primarily via their presence on the toolbar.Learn more on [Focusability of disabledcontrols](https://www.w3.org/TR/wai-aria-practices-1.2/#kbd_disabled_controls). |
| **`onFocusVisible`**         | <code title="((event: SyntheticEvent&#60;Element, Event&#62;) =&#62; void) \| undefined">((event: SyntheticEvent&#60;Element, Event&#62;) =&#62; voi...</code> | Custom event handler that is called when the element is focused via thekeyboard or when a key is pressed while the element is focused.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`clickOnEnter`**           | <code>boolean \| undefined</code>                                                                                                                              | If true, pressing the enter key will trigger a click on the button.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **`clickOnSpace`**           | <code>boolean \| undefined</code>                                                                                                                              | If true, pressing the space key will trigger a click on the button.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

</details>
