import * as React from "react";
import { axe } from "jest-axe";
import { click, render } from "reakit-test-utils";

import { AriaLink } from "..";

const AriaLinkComp = () => {
  return (
    <div>
      <AriaLink
        href="https://adobe.com"
        target="_blank"
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Adobe
      </AriaLink>
    </div>
  );
};

describe("AriaLink", () => {
  it("should render correctly", () => {
    const { baseElement } = render(<AriaLinkComp />);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div>
            <a
              href="https://adobe.com"
              style="color: blue; text-decoration: underline; cursor: pointer;"
              target="_blank"
            >
              Adobe
            </a>
          </div>
        </div>
      </body>
    `);
  });

  [true, false].forEach(state => {
    const should = state ? "should" : "should not";
    test(`onPress ${should} fire when isDisabled prop is "${state}"`, () => {
      const alertFn = jest.fn();
      const { getByText: text } = render(
        <AriaLink
          href="#"
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onPress={alertFn}
          isDisabled={state}
        >
          Adobe
        </AriaLink>,
      );

      click(text("Adobe"));
      expect(alertFn).toBeCalledTimes(state ? 0 : 1);
    });
  });

  test("Link renders with no a11y violations", async () => {
    const { container } = render(<AriaLinkComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
