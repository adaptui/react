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

test("Accordion: initial state", () => {
  const result = render();

  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "allowMultiple": false,
      "allowToggle": false,
      "baseId": "base",
      "currentId": undefined,
      "groups": Array [],
      "items": Array [],
      "loop": false,
      "manual": true,
      "orientation": "vertical",
      "panels": Array [],
      "rtl": false,
      "selectedId": null,
      "selectedIds": Array [],
      "unstable_angular": false,
      "unstable_hasActiveWidget": false,
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "unstable_moves": 0,
      "unstable_virtual": false,
      "wrap": false,
    }
  `);
});
