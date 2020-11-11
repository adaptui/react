import { renderHook } from "reakit-test-utils/hooks";
import { jestSerializerStripFunctions } from "reakit-test-utils/jestSerializerStripFunctions";

import { useAccordionState } from "../AccordionState";
import { AccordionInitialState } from "../types";

expect.addSnapshotSerializer(jestSerializerStripFunctions);

function render({
  baseId = "base",
  ...initialState
}: Partial<AccordionInitialState> = {}) {
  return renderHook(() => useAccordionState({ baseId, ...initialState }))
    .result;
}

describe("useAccordionState", () => {
  test("initial state", () => {
    const result = render();

    expect(result.current).toMatchSnapshot();
  });
});
