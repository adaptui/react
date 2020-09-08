/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useNumberInput](https://github.com/chakra-ui/chakra-ui/blob/develop/packages/number-input/src/use-number-input.ts)
 * to work with Reakit System
 */
import { createComponent } from "reakit-system";

import { createNumberInputButtonsHook } from "./createNumberInputButtonsHook";

export const NumberInputIncrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: createNumberInputButtonsHook("increment"),
});
