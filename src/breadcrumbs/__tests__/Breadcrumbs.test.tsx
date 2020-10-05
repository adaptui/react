import * as React from "react";
import { axe, render } from "reakit-test-utils";

import { Breadcrumbs, BreadcrumbLink } from "..";

const BreadcrumbComp = () => {
  return (
    <Breadcrumbs className="breadcrumb">
      <ol>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/">
            WAI-ARIA Authoring Practices 1.1
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink as="span" onClick={() => alert("Go to link")}>
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
    const { getByTestId: testId, baseElement } = render(<BreadcrumbComp />);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <nav
            aria-label="Breadcrumb"
            class="breadcrumb"
          >
            <ol>
              <li>
                <a
                  href="https://www.w3.org/TR/wai-aria-practices-1.1/"
                >
                  WAI-ARIA Authoring Practices 1.1
                </a>
              </li>
              <li>
                <span
                  role="link"
                  tabindex="0"
                >
                  Design Patterns
                </span>
              </li>
              <li>
                <a
                  aria-current="page"
                  href="https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb"
                >
                  Breadcrumb Pattern
                </a>
              </li>
              <li>
                <a
                  href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html"
                >
                  Breadcrumb Example
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </body>
    `);
  });

  test("Breadcrumb renders with no a11y violations", async () => {
    const { container } = render(<BreadcrumbComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
