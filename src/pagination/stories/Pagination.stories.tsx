import React from "react";

import { Meta } from "@storybook/react";
import { Pagination } from "../Pagination";
import { PaginationButton, TGoto } from "../PaginationButton";
import { UsePaginationProps, usePaginationState } from "../PaginationState";

export default {
  title: "Component/Pagination",
} as Meta;

const PaginationComp: React.FC<UsePaginationProps> = props => {
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

export const Default = () => {
  return <PaginationComp />;
};

export const Controlled = () => {
  const [page, setPage] = React.useState(1);

  return <PaginationComp page={page} onChange={value => setPage(value)} />;
};

export const DefaultPage = () => {
  return <PaginationComp defaultPage={5} />;
};

export const BoundaryCount = () => {
  return <PaginationComp count={50} boundaryCount={5} defaultPage={25} />;
};

export const SibilingCount = () => {
  return <PaginationComp count={50} siblingCount={2} defaultPage={25} />;
};
