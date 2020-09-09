import React from "react";

import { Meta } from "@storybook/react";
import { Pagination } from "../Pagination";
import { PaginationPrev } from "../PaginationPrev";
import { PaginationNext } from "../PaginationNext";
import { PaginationItem } from "../PaginationItem";
import { UsePaginationProps, usePaginationState } from "../PaginationState";

export default {
  title: "Component/Pagination",
} as Meta;

const PaginationComp: React.FC<UsePaginationProps> = props => {
  const state = usePaginationState(props);

  return (
    <Pagination {...state}>
      <ul style={{ display: "flex", listStyle: "none" }}>
        <li>
          <PaginationPrev {...state}>Previous</PaginationPrev>
        </li>
        {state.pages.map(page => {
          if (page === "start-ellipsis" || page === "end-ellipsis") {
            return <li key={page}>...</li>;
          }

          return (
            <li key={page}>
              <PaginationItem
                page={page}
                style={{
                  fontWeight: state.currentPage === page ? "bold" : undefined,
                }}
                {...state}
              >
                {page}
              </PaginationItem>
            </li>
          );
        })}
        <li>
          <PaginationNext {...state}>Next</PaginationNext>
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
