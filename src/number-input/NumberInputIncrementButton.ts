import { createComponent } from "reakit-system";
import { createNumberInputHook } from "./createNumberInputHook";

export const NumberInputIncrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: createNumberInputHook("increment"),
});
