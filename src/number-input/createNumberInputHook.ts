import { createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit/Button";

import { useSpinButton } from "./__utils";
import { NumberInputStateReturn } from "./NumberInputState";
import { NUMBERINPUT_BUTTON_KEYS } from "./__keys";

export type NumberInputButtonOptions = ButtonOptions &
  Pick<Partial<NumberInputStateReturn>, "keepWithinRange"> &
  Pick<
    NumberInputStateReturn,
    "focusInput" | "increment" | "decrement" | "isAtMin" | "isAtMax" | "spinner"
  >;

export const createNumberInputHook = (type: "increment" | "decrement") => {
  return createHook<NumberInputButtonOptions, ButtonHTMLProps>({
    name: `NumberInput`,
    compose: useButton,
    keys: NUMBERINPUT_BUTTON_KEYS,

    useProps(options, htmlProps) {
      return useSpinButton(options, htmlProps, type);
    },
  });
};
