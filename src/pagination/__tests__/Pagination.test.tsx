import * as React from "react";
import { axe, render, press } from "reakit-test-utils";

import {
  TGoto,
  Pagination,
  PaginationButton,
  usePaginationState,
  UsePaginationProps,
} from "..";

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
    const { getByTestId: testId, queryByText: text } = render(
      <PaginationComp />,
    );

    press.Tab();
    expect(text("1")).toHaveFocus();
    expect(text("Previous")).toBeDisabled();
    expect(text("First")).toBeDisabled();

    press.Tab();
    expect(text("2")).toHaveFocus();

    press.Enter();
    expect(text("First")).not.toBeDisabled();
    expect(text("Previous")).not.toBeDisabled();

    press.Tab();
    press.Tab();
    press.Tab();
    press.Enter();
    expect(text("2")).toBeNull();

    press.Tab();
    press.Tab();
    press.Enter();
    expect(text("5")).toBeNull();
    expect(text("Last")).toBeDisabled();
    expect(text("Next")).toBeDisabled();
  });

  test("Pagination renders with no a11y violations", async () => {
    const { container } = render(<PaginationComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
