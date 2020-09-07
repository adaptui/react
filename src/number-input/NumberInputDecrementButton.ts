import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit/Button";

import { useSpinButton } from "./__utils";
import { NumberInputStateReturn } from "./NumberInputState";
import { NUMBERINPUT_DECREMENTBUTTON_KEYS } from "./__keys";

export type NumberInputDecrementButtonOptions = ButtonOptions &
  Pick<Partial<NumberInputStateReturn>, "keepWithinRange"> &
  Pick<
    NumberInputStateReturn,
    "focusInput" | "increment" | "decrement" | "isAtMin" | "spinner"
  >;

export type NumberInputDecrementButtonHTMLProps = ButtonHTMLProps;

export type NumberInputDecrementButtonProps = NumberInputDecrementButtonOptions &
  NumberInputDecrementButtonHTMLProps;

export const useNumberInputDecrementButton = createHook<
  NumberInputDecrementButtonOptions,
  NumberInputDecrementButtonHTMLProps
>({
  name: "NumberInputDecrementButton",
  compose: useButton,
  keys: NUMBERINPUT_DECREMENTBUTTON_KEYS,

  useProps(options, htmlProps) {
    return useSpinButton(options, htmlProps, "decrement");
  },
});

export const NumberInputDecrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: useNumberInputDecrementButton,
});
