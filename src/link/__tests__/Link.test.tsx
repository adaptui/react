import * as React from "react";
import { axe, render } from "reakit-test-utils";

import { Link } from "../index";

describe("ReakitLink", () => {
  it("should render correctly", () => {
    const { baseElement } = render(<Link href="#">link</Link>);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <a
            href="#"
          >
            link
          </a>
        </div>
      </body>
    `);
  });

  it("should render correctly with isExternal", () => {
    const { baseElement } = render(
      <Link href="#" isExternal>
        link
      </Link>,
    );

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <a
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            link
          </a>
        </div>
      </body>
    `);
  });

  it("should render correctly with isExternal & disabled", () => {
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
                href="#"
                rel="noopener noreferrer"
                style="pointer-events: none;"
                tabindex="-1"
                target="_blank"
              >
                link
              </a>
            </div>
          </body>
      `);
  });

  it("should render correctly with non native link tag", () => {
    const { baseElement } = render(
      <Link as="span" onClick={() => alert("Custom Link")}>
        Reakit
      </Link>,
    );

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <span
            role="link"
            tabindex="0"
          >
            Reakit
          </span>
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
