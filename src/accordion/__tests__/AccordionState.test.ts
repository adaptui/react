import { renderHook } from "reakit-test-utils/hooks";
import { jestSerializerStripFunctions } from "reakit-test-utils/jestSerializerStripFunctions";

import { useAccordionState, AccordionInitialState } from "../AccordionState";

expect.addSnapshotSerializer(jestSerializerStripFunctions);

function render({
  baseId = "base",
  ...initialState
}: AccordionInitialState = {}) {
  return renderHook(() => useAccordionState({ baseId, ...initialState }))
    .result;
}

describe("useAccordionState", () => {
  test("initial state", () => {
    const result = render();

    expect(result.current).toMatchSnapshot();
  });
});
