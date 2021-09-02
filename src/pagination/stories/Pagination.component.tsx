import * as React from "react";

import {
  Pagination,
  PaginationButton,
  usePaginationState,
  PaginationInitialState,
  TGoto,
} from "../../index";

export const App: React.FC<PaginationInitialState> = props => {
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
