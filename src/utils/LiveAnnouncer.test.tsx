import React from "react";
import { axe } from "jest-axe";
import { fireEvent, render } from "reakit-test-utils";

import {
  announce,
  destroyAnnouncer,
  LiveRegionAnnouncer,
} from "./LiveAnnouncer";

beforeEach(() => {
  destroyAnnouncer();
});

describe("LiveAnnouncer", () => {
  it("should render correctly", () => {
    announce("Hello world", "assertive", 0);

    expect(document.body).toMatchSnapshot();

    destroyAnnouncer();

    expect(document.body).toMatchInlineSnapshot(`<body />`);
  });

  test("LiveRegionAnnouncer", () => {
    const assertiveMessage = "Hello Assertive";
    const politeMessage = "Hello Polite";

    const Announcer = () => {
      const ref = React.useRef();

      return (
        <div>
          <LiveRegionAnnouncer ref={ref} />
          <button
            onClick={() =>
              (ref.current as any).announce(assertiveMessage, "assertive", 0)
            }
          >
            announce assertive
          </button>
          <button
            onClick={() =>
              (ref.current as any).announce(politeMessage, "polite", 0)
            }
          >
            announce polite
          </button>
          <button onClick={() => (ref.current as any).clear()}>clear</button>
        </div>
      );
    };
    const { getByText: text, queryAllByTestId: testIdAll } = render(
      <Announcer />,
    );

    fireEvent.click(text("announce assertive"));
    expect(testIdAll("announcer-assertive")[1]).toHaveTextContent(
      assertiveMessage,
    );

    // Clear
    fireEvent.click(text("clear"));
    expect(testIdAll("announcer-assertive")[1]).toHaveTextContent("");

    // Polite
    fireEvent.click(text("announce polite"));
    expect(testIdAll("announcer-polite")[1]).toHaveTextContent(politeMessage);

    // Clear
    fireEvent.click(text("clear"));
    expect(testIdAll("announcer-polite")[1]).toHaveTextContent("");
  });

  test("LiveAnnouncer renders with no a11y violations", async () => {
    announce("Hello a11y");
    const results = await axe(document.body);

    expect(results).toHaveNoViolations();
  });
});
