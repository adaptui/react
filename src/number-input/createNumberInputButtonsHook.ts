import { createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit/Button";

import { NUMBER_INPUT_BUTTON_KEYS } from "./__keys";
import { NumberInputStateReturn } from "./NumberInputState";
import { useNumberInputButton } from "./useNumberInputButton";

export type NumberInputButtonOptions = ButtonOptions &
  Pick<Partial<NumberInputStateReturn>, "keepWithinRange"> &
  Pick<
    NumberInputStateReturn,
    | "focusInput"
    | "increment"
    | "decrement"
    | "isAtMin"
    | "isAtMax"
    | "spinUp"
    | "spinDown"
    | "spinStop"
  >;

export type NumberInputButtonHTMLProps = ButtonHTMLProps;

export type NumberInputButtonProps = NumberInputButtonOptions &
  NumberInputButtonHTMLProps;

export const createNumberInputButtonsHook = (
  type: "increment" | "decrement",
) => {
  return createHook<NumberInputButtonOptions, NumberInputButtonHTMLProps>({
    name: `NumberInput`,
    compose: useButton,
    keys: NUMBER_INPUT_BUTTON_KEYS,

    useProps(options, htmlProps) {
      return useNumberInputButton(options, htmlProps, type);
    },
  });
};
