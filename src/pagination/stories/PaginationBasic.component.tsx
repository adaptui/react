import * as React from "react";

import {
  Goto,
  Pagination,
  PaginationButton,
  PaginationStateProps,
  usePaginationState,
} from "../../index";

export const PaginationBasic: React.FC<PaginationStateProps> = props => {
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
                goto={page as Goto}
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
