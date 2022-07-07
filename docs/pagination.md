# Pagination

`Pagination` component provides all the accessibility features for the page
navigation.

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)

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

[![Edit CodeSandbox](https://img.shields.io/badge/Pagination-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/47y21q)

## Accessibility Requirement

- `Pagination` should have `aria-label` or `aria-labelledby` attribute.

## Composition

- Pagination uses
- PaginationButton uses

<!-- INJECT_PROPS src/pagination -->
