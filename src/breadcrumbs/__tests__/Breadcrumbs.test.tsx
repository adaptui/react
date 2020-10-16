import * as React from "react";
import { axe, render } from "reakit-test-utils";

import { Breadcrumbs, BreadcrumbLink } from "../index";

const BreadcrumbComp = () => {
  return (
    <Breadcrumbs>
      <ol>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/">
            WAI-ARIA Authoring Practices 1.1
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex">
            Design Patterns
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink
            isCurrent
            href="https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb"
          >
            Breadcrumb Pattern
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html">
            Breadcrumb Example
          </BreadcrumbLink>
        </li>
      </ol>
    </Breadcrumbs>
  );
};

describe("Breadcrumb", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<BreadcrumbComp />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("Breadcrumb renders with no a11y violations", async () => {
    const { container } = render(<BreadcrumbComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
