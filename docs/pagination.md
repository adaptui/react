# Pagination

`Pagination` component provides all the accessibility features for the page
navigation.

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)
- [Composition](#composition)
- [Props](#props)
  - [`PaginationOptions`](#paginationoptions)
  - [`PaginationButtonOptions`](#paginationbuttonoptions)
  - [`PaginationStateProps`](#paginationstateprops)

## Usage

```js
import * as React from "react";

import {
  Pagination,
  PaginationButton,
  usePaginationState,
} from "@adaptui/react";

export const PaginationBasic = props => {
  const state = usePaginationState({ count: 10, ...props });

  return (
    <Pagination state={state} aria-label="Pagination">
      <ul style={{ display: "flex", listStyle: "none" }}>
        <li>
          <PaginationButton goto="firstPage">First</PaginationButton>
        </li>
        <li>
          <PaginationButton goto="prevPage">Previous</PaginationButton>
        </li>
        {state.pages.map(page => {
          if (page === "start-ellipsis" || page === "end-ellipsis") {
            return <li key={page}>...</li>;
          }

          return (
            <li key={page}>
              <PaginationButton
                goto={page}
                style={{
                  fontWeight: state.currentPage === page ? "bold" : undefined,
                }}
              >
                {page}
              </PaginationButton>
            </li>
          );
        })}
        <li>
          <PaginationButton goto="nextPage">Next</PaginationButton>
        </li>
        <li>
          <PaginationButton goto="lastPage">Last</PaginationButton>
        </li>
      </ul>
    </Pagination>
  );
};

export default PaginationBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Pagination-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/85s7o8)
[![Edit CodeSandbox](https://img.shields.io/badge/Pagination%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/r6y0e8)

## Accessibility Requirement

- `Pagination` should have `aria-label` or `aria-labelledby` attribute.

## Composition

- Pagination uses `Role`
- PaginationButton uses `Role`
- usePaginationState uses its own state

## Props

### `PaginationOptions`

| Name        | Type                         | Description                                       |
| :---------- | :--------------------------- | :------------------------------------------------ |
| **`state`** | <code>PaginationState</code> | Object returned by the `usePaginationState` hook. |

### `PaginationButtonOptions`

| Name        | Type                                      | Description                                       |
| :---------- | :---------------------------------------- | :------------------------------------------------ |
| **`state`** | <code>PaginationState \| undefined</code> | Object returned by the `usePaginationState` hook. |
| **`goto`**  | <code>Goto</code>                         | Provide the page you want to go.                  |

### `PaginationStateProps`

| Name                | Type                                                   | Description                                                 |
| :------------------ | :----------------------------------------------------- | :---------------------------------------------------------- |
| **`defaultPage`**   | <code>number \| undefined</code>                       | Set the default page(uncontrollable)                        |
| **`page`**          | <code>number \| undefined</code>                       | Set the page(controllable)                                  |
| **`onChange`**      | <code>((page: number) =&#62; void) \| undefined</code> |                                                             |
| **`count`**         | <code>number \| undefined</code>                       | Total no. of pages                                          |
| **`boundaryCount`** | <code>number \| undefined</code>                       | No. of boundary pages to be visible                         |
| **`siblingCount`**  | <code>number \| undefined</code>                       | No. of sibiling pages allowed before/after the current page |
