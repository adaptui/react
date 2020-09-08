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

test("initial state", () => {
  const result = render();
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "activeItems": Array [],
      "allowMultiple": false,
      "allowToggle": true,
      "baseId": "base",
      "buttons": Array [],
      "defaultActiveId": undefined,
      "items": Array [],
      "loop": true,
      "manual": true,
      "unstable_idCountRef": Object {
        "current": 0,
      },
    }
  `);
});
