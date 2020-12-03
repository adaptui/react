# Pagination

`Pagination` component provides all the accessibility features for the page
navigation.

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)
- [Composition](#composition)
- [Props](#props)
  - [`usePaginationState`](#usepaginationstate)
  - [`Pagination`](#pagination)
  - [`PaginationButton`](#paginationbutton)

## Usage

```js
import * as React from "react";

import {
  Pagination,
  PaginationButton,
  usePaginationState,
} from "@renderlesskit/react";

export const App = props => {
  const state = usePaginationState({ count: 10, ...props });

  return (
    <Pagination {...state} aria-label="Pagination">
      <ul style={{ display: "flex", listStyle: "none" }}>
        <li>
          <PaginationButton goto="firstPage" {...state}>
            First
          </PaginationButton>
        </li>
        <li>
          <PaginationButton goto="prevPage" {...state}>
            Previous
          </PaginationButton>
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
                {...state}
              >
                {page}
              </PaginationButton>
            </li>
          );
        })}
        <li>
          <PaginationButton goto="nextPage" {...state}>
            Next
          </PaginationButton>
        </li>
        <li>
          <PaginationButton goto="lastPage" {...state}>
            Last
          </PaginationButton>
        </li>
      </ul>
    </Pagination>
  );
};

export default App;
```

[Pagination - Open On Sandbox](https://codesandbox.io/s/p92pq)

## Accessibility Requirement

- `Pagination` should have `aria-label` or `aria-labelledby` attribute.

## Composition

- Pagination uses [useRole](https://reakit.io/docs/role)
- PaginationButton uses [useButton](https://reakit.io/docs/button)

## Props

### `usePaginationState`

- **`defaultPage`** <code>number | undefined</code> Set the default
  page(uncontrollable)
- **`page`** <code>number | undefined</code> Set the page(controllable)
- **`onChange`** <code>((page: number) =&#62; void) | undefined</code>

- **`count`** <code>number | undefined</code> Total no. of pages
- **`boundaryCount`** <code>number | undefined</code> No. of boundary pages to
  be visible
- **`siblingCount`** <code>number | undefined</code> No. of sibiling pages
  allowed before/after the current page

### `Pagination`

<details><summary>9 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`currentPage`** <code>number</code> The current active page
- **`pages`** <code>(string | number)[]</code> All the page with start & end
  ellipsis
- **`isAtFirstPage`** <code>boolean</code> True, if the currentPage is at first
  page
- **`isAtLastPage`** <code>boolean</code> True, if the currentPage is at last
  page
- **`movePage`** <code>(page: number) =&#62; void</code> Go to the specified
  page number
- **`nextPage`** <code>() =&#62; void</code> Go to next page
- **`prevPage`** <code>() =&#62; void</code> Go to previous page
- **`firstPage`** <code>() =&#62; void</code> Go to first page
- **`lastPage`** <code>() =&#62; void</code> Go to last page

</details>

### `PaginationButton`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`goto`**
  <code title="number | &#34;nextPage&#34; | &#34;prevPage&#34; | &#34;firstPage&#34; | &#34;lastPage&#34;">number
  | &#34;nextPage&#34; | &#34;prevPage&#34; | &#34;firstPage&#34; ...</code>

<details><summary>8 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`currentPage`** <code>number</code> The current active page
- **`movePage`** <code>(page: number) =&#62; void</code> Go to the specified
  page number
- **`nextPage`** <code>() =&#62; void</code> Go to next page
- **`prevPage`** <code>() =&#62; void</code> Go to previous page
- **`firstPage`** <code>() =&#62; void</code> Go to first page
- **`lastPage`** <code>() =&#62; void</code> Go to last page
- **`isAtLastPage`** <code>boolean</code> True, if the currentPage is at last
  page
- **`isAtFirstPage`** <code>boolean</code> True, if the currentPage is at first
  page

</details>
