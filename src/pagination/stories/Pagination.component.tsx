import * as React from "react";

import {
  Pagination,
  PaginationButton,
  usePaginationState,
  PaginationInitialState,
} from "renderless-components";

type TGoto = "nextPage" | "prevPage" | "lastPage" | "firstPage" | number;

export interface AppProps extends PaginationInitialState {}

export const App = (props: AppProps) => {
  const state = usePaginationState({ count: 10, ...props });

  return (
    <Pagination {...state}>
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
