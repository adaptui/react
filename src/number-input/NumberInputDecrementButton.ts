import { createComponent } from "reakit-system";
import { createNumberInputHook } from "./createNumberInputHook";

export const NumberInputDecrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: createNumberInputHook("decrement"),
});
