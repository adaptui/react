import { createComponent } from "reakit-system";

import { createNumberInputButtonsHook } from "./createNumberInputButtonsHook";

export const NumberInputDecrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: createNumberInputButtonsHook("decrement"),
});
