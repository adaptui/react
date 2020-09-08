import { createComponent } from "reakit-system";

import { createNumberInputButtonsHook } from "./createNumberInputButtonsHook";

export const NumberInputIncrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: createNumberInputButtonsHook("increment"),
});
