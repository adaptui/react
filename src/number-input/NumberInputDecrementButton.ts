import * as React from "react";
import { callAllHandlers } from "@chakra-ui/utils";
import { createHook, createComponent } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { NumberInputStateReturn } from "./index";
import { NUMBER_INPUT_DECREMENT_BUTTON_KEYS } from "./__keys";

export type NumberInputDecrementButtonOptions = ButtonOptions &
  Pick<Partial<NumberInputStateReturn>, "keepWithinRange"> &
  Pick<
    NumberInputStateReturn,
    "focusInput" | "isAtMin" | "spinDown" | "spinStop"
  >;

export type NumberInputDecrementButtonHTMLProps = ButtonHTMLProps;

export type NumberInputDecrementButtonProps = NumberInputDecrementButtonOptions &
  NumberInputDecrementButtonHTMLProps;

export const useNumberInputDecrementButton = createHook<
  NumberInputDecrementButtonOptions,
  NumberInputDecrementButtonHTMLProps
>({
  name: `NumberInput`,
  compose: useButton,
  keys: NUMBER_INPUT_DECREMENT_BUTTON_KEYS,

  useOptions(options) {
    const { keepWithinRange, isAtMin } = options;
    const disabled = options.disabled || (keepWithinRange && isAtMin);
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
    const {
      spinDown: spinDownProp,
      spinStop: spinStopProp,
      focusInput,
    } = options;

    const spinDown = React.useCallback(
      (event: any) => {
        event.preventDefault();
        spinDownProp();
        focusInput();
      },
      [focusInput, spinDownProp],
    );

    const spinStop = React.useCallback(
      (event: any) => {
        event.preventDefault();
        spinStopProp();
      },
      [spinStopProp],
    );

    React.useEffect(() => {
      // Need to stop the spinner when isAtMin
      if (options.disabled) spinStopProp();
    }, [options.disabled, spinStopProp]);

    return {
      tabIndex: -1,
      onMouseDown: callAllHandlers(onMouseDown, spinDown),
      onTouchStart: callAllHandlers(onTouchStart, spinDown),
      onMouseUp: callAllHandlers(onMouseUp, spinStop),
      onMouseLeave: callAllHandlers(onMouseLeave, spinStop),
      onTouchEnd: callAllHandlers(onTouchEnd, spinStop),
      ...htmlProps,
    };
  },
});

export const NumberInputDecrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: useNumberInputDecrementButton,
});
