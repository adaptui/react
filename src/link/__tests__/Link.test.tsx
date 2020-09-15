import * as React from "react";
import { axe, render } from "reakit-test-utils";

import { Link } from "..";

describe("ReakitLink", () => {
  it("should render correctly", () => {
    const { baseElement } = render(
      <Link href="#" isExternal disabled>
        link
      </Link>,
    );

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <a
            aria-disabled="true"
            disabled=""
            href="#"
            rel="noopener noreferrer"
            style="pointer-events: none;"
            target="_blank"
          >
            link
          </a>
        </div>
      </body>
    `);
  });

  test("Link renders with no a11y violations", async () => {
    const { container } = render(<Link href="#">link</Link>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
