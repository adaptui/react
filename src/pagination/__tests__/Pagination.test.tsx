import * as React from "react";
import { axe, render, press } from "reakit-test-utils";

import {
  TGoto,
  Pagination,
  PaginationButton,
  usePaginationState,
  UsePaginationProps,
} from "..";
import { repeat } from "../../utils/test-utils";

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

describe("Pagination", () => {
  it("should render correctly", () => {
    const { queryByText: text } = render(<PaginationComp />);

    const prev = text("Previous");
    const next = text("Next");
    const first = text("First");
    const last = text("Last");

    press.Tab();
    expect(text("1")).toHaveFocus();
    expect(prev).toBeDisabled();
    expect(first).toBeDisabled();

    press.Tab();
    expect(text("2")).toHaveFocus();

    press.Enter();
    expect(first).not.toBeDisabled();
    expect(prev).not.toBeDisabled();

    repeat(press.Tab, 3);
    press.Enter();
    expect(text("2")).toBeNull();

    repeat(press.Tab, 2);
    press.Enter();
    expect(text("5")).toBeNull();
    expect(last).toBeDisabled();
    expect(next).toBeDisabled();
  });

  test("Pagination renders with no a11y violations", async () => {
    const { container } = render(<PaginationComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
