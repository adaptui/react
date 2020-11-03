import * as React from "react";

import {
  Pagination,
  PaginationButton,
  usePaginationState,
} from "renderless-components";

type TGoto = "next" | "prev" | "last" | "first" | number;

export interface AppProps {
  count?: number;
  defaultPage?: number;
  boundaryCount?: number;
  page?: number;
  siblingCount?: number;
  onChange?(value: number): void;
}

export const App = (props: AppProps) => {
  const state = usePaginationState({ count: 10, ...props });

  return (
    <Pagination {...state}>
      <ul style={{ display: "flex", listStyle: "none" }}>
        <li>
          <PaginationButton goto="first" {...state}>
            First
          </PaginationButton>
        </li>
        <li>
          <PaginationButton goto="prev" {...state}>
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
                goto={page as TGoto}
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
          <PaginationButton goto="next" {...state}>
            Next
          </PaginationButton>
        </li>
        <li>
          <PaginationButton goto="last" {...state}>
            Last
          </PaginationButton>
        </li>
      </ul>
    </Pagination>
  );
};

export default App;
