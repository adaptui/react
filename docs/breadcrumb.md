# Breadcrumb

`Breadcrumb` component is used for the page navigation and it provides the
required aria attributes for it's links and the current link. It follows the
[WAI-ARIA Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
for its
[accessibility properties](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/#:~:text=Not%20applicable.-,WAI%2DARIA%20Roles%2C%20States%2C%20and%20Properties,-Breadcrumb%20trail%20is).

## Table of Contents

- [Usage](#usage)
- [Composition](#composition)
- [Props](#props)
  - [`BreadcrumbLinkOptions`](#breadcrumblinkoptions)
  - [`BreadcrumbsOptions`](#breadcrumbsoptions)

## Usage

```js
import * as React from "react";

import { BreadcrumbLink, Breadcrumbs } from "@adaptui/react";

export const BreadcrumbsBasic = props => {
  return (
    <Breadcrumbs className="breadcrumb">
      <ol>
        <li>
          <BreadcrumbLink href="https://www.w3.org/WAI/ARIA/apg/">
            ARIA Authoring Practices Guide
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/WAI/ARIA/apg/patterns/">
            APG Patterns
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink
            isCurrentPage
            href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/"
          >
            Breadcrumb Pattern
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/">
            Breadcrumb Example
          </BreadcrumbLink>
        </li>
      </ol>
    </Breadcrumbs>
  );
};

export default BreadcrumbsBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Breadcrumbs-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/edse1g)
[![Edit CodeSandbox](https://img.shields.io/badge/Breadcrumbs%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/0jfmlo)

## Composition

- BreadcrumbLink uses `CommandOptions`
- Breadcrumbs uses `Role`

## Props

### `BreadcrumbLinkOptions`

| Name                | Type                              | Description                          |
| :------------------ | :-------------------------------- | :----------------------------------- |
| **`isCurrentPage`** | <code>boolean \| undefined</code> | If true, sets `aria-current: "page"` |

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

### `BreadcrumbsOptions`

No props to show
