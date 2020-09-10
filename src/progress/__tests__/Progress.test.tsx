import * as React from "react";
import { axe } from "jest-axe";
import { render } from "reakit-test-utils";

import { Progress, ProgressProps, useProgressState } from "..";

const ProgressComp = (props: Partial<ProgressProps>) => {
  const progress = useProgressState(props);

  return (
    <div>
      <Progress data-testid="progress" {...progress} />
    </div>
  );
};

describe("Progress", () => {
  it("should render correctly", () => {
    const { baseElement } = render(<ProgressComp value={10} />);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div>
            <div
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow="10"
              aria-valuetext="10"
              data-testid="progress"
              role="progressbar"
            />
          </div>
        </div>
      </body>
    `);
  });

  it("should render isIndeterminate", () => {
    const { getByTestId: testid } = render(<ProgressComp />);

    expect(testid("progress")).toHaveAttribute("data-indeterminate", "");
  });

  test("Progress renders with no a11y violations", async () => {
    const { container } = render(<ProgressComp value={50} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
