import * as React from "react";
import { createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";
import { callAllHandlers } from "@chakra-ui/utils";

import { createComponent } from "../system";

import { NUMBER_INPUT_INCREMENT_BUTTON_KEYS } from "./__keys";
import { NumberInputStateReturn } from "./index";

export type NumberInputIncrementButtonOptions = ButtonOptions &
  Pick<Partial<NumberInputStateReturn>, "keepWithinRange"> &
  Pick<
    NumberInputStateReturn,
    "focusInput" | "isAtMax" | "spinUp" | "spinStop" | "isDisabled"
  >;

export type NumberInputIncrementButtonHTMLProps = ButtonHTMLProps;

export type NumberInputIncrementButtonProps =
  NumberInputIncrementButtonOptions & NumberInputIncrementButtonHTMLProps;

export const useNumberInputIncrementButton = createHook<
  NumberInputIncrementButtonOptions,
  NumberInputIncrementButtonHTMLProps
>({
  name: `NumberInput`,
  compose: useButton,
  keys: NUMBER_INPUT_INCREMENT_BUTTON_KEYS,

  useOptions(options) {
    const { keepWithinRange, isAtMax } = options;
    const disabled =
      options.disabled || (keepWithinRange && isAtMax) || options.isDisabled;

    return { ...options, disabled };
  },

  useProps(
    options,
    {
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      ...htmlProps
    },
  ) {
    const { spinUp: spinUpProp, spinStop: spinStopProp, focusInput } = options;

    const spinUp = React.useCallback(
      (event: any) => {
        event.preventDefault();
        spinUpProp();
        focusInput();
      },
      [focusInput, spinUpProp],
    );

    const spinStop = React.useCallback(
      (event: any) => {
        event.preventDefault();
        spinStopProp();
      },
      [spinStopProp],
    );

    React.useEffect(() => {
      // Need to stop the spinner when isAtMax
      if (options.disabled) spinStopProp();
    }, [options.disabled, spinStopProp]);

    return {
      "aria-hidden": true,
      tabIndex: -1,
      onMouseDown: callAllHandlers(onMouseDown, spinUp),
      onTouchStart: callAllHandlers(onTouchStart, spinUp),
      onMouseUp: callAllHandlers(onMouseUp, spinStop),
      onMouseLeave: callAllHandlers(onMouseLeave, spinStop),
      onTouchEnd: callAllHandlers(onTouchEnd, spinStop),
      ...htmlProps,
    };
  },
});

export const NumberInputIncrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: useNumberInputIncrementButton,
});
