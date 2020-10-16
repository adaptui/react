import * as React from "react";
import { axe, render } from "reakit-test-utils";

import { Link } from "../index";

describe("ReakitLink", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Link href="#">link</Link>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with isExternal", () => {
    const { asFragment } = render(
      <Link href="#" isExternal>
        link
      </Link>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with isExternal & disabled", () => {
    const { asFragment } = render(
      <Link href="#" isExternal disabled>
        link
      </Link>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with non native link tag", () => {
    const { asFragment } = render(
      <Link as="span" onClick={() => alert("Custom Link")}>
        Reakit
      </Link>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("Link renders with no a11y violations", async () => {
    const { container } = render(<Link href="#">link</Link>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
