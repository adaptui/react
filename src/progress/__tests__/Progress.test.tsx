import * as React from "react";
import { axe, render, screen } from "reakit-test-utils";

import { Progress, ProgressProps, useProgressState } from "../index";

const ProgressComp = (props: Partial<ProgressProps>) => {
  const progress = useProgressState(props);

  return (
    <div>
      <Progress
        data-testid="testid-progress"
        aria-label="progress"
        {...progress}
      />
    </div>
  );
};

describe("Progress", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<ProgressComp value={10} />);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          <div
            aria-label="progress"
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow="10"
            aria-valuetext="10"
            data-testid="testid-progress"
            role="progressbar"
          />
        </div>
      </DocumentFragment>
    `);
  });

  it("should render isIndeterminate", () => {
    render(<ProgressComp value={null} />);

    expect(screen.getByTestId("testid-progress")).toHaveAttribute(
      "data-indeterminate",
      "",
    );
  });

  test("Progress renders with no a11y violations", async () => {
    const { container } = render(<ProgressComp value={50} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
