import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit/Button";

import { useSpinButton } from "./__utils";
import { NumberInputStateReturn } from "./NumberInputState";
import { NUMBERINPUT_INCREMENTBUTTON_KEYS } from "./__keys";

export type NumberInputIncrementButtonOptions = ButtonOptions &
  Pick<Partial<NumberInputStateReturn>, "keepWithinRange"> &
  Pick<
    NumberInputStateReturn,
    "focusInput" | "increment" | "decrement" | "isAtMax" | "spinner"
  >;

export type NumberInputIncrementButtonHTMLProps = ButtonHTMLProps;

export type NumberInputIncrementButtonProps = NumberInputIncrementButtonOptions &
  NumberInputIncrementButtonHTMLProps;

export const useNumberInputIncrementButton = createHook<
  NumberInputIncrementButtonOptions,
  NumberInputIncrementButtonHTMLProps
>({
  name: "NumberInputIncrementButton",
  compose: useButton,
  keys: NUMBERINPUT_INCREMENTBUTTON_KEYS,

  useProps(options, htmlProps) {
    return useSpinButton(options, htmlProps);
  },
});

export const NumberInputIncrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: useNumberInputIncrementButton,
});
