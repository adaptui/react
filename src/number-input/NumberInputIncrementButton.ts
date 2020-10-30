import * as React from "react";
import { callAllHandlers } from "@chakra-ui/utils";
import { createHook, createComponent } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { NumberInputStateReturn } from "./index";
import { NUMBER_INPUT_INCREMENT_BUTTON_KEYS } from "./__keys";

export type NumberInputIncrementButtonOptions = ButtonOptions &
  Pick<Partial<NumberInputStateReturn>, "keepWithinRange"> &
  Pick<
    NumberInputStateReturn,
    "focusInput" | "isAtMax" | "spinUp" | "spinStop"
  >;

export type NumberInputIncrementButtonHTMLProps = ButtonHTMLProps;

export type NumberInputIncrementButtonProps = NumberInputIncrementButtonOptions &
  NumberInputIncrementButtonHTMLProps;

export const useNumberInputIncrementButton = createHook<
  NumberInputIncrementButtonOptions,
  NumberInputIncrementButtonHTMLProps
>({
  name: `NumberInput`,
  compose: useButton,
  keys: NUMBER_INPUT_INCREMENT_BUTTON_KEYS,

  useOptions(options) {
    const { keepWithinRange, isAtMax } = options;
    const disabled = options.disabled || (keepWithinRange && isAtMax);
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
      isAtMax,
      spinUp: spinUpProp,
      spinStop: spinStopProp,
      focusInput,
    } = options;

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
      if (isAtMax) spinStopProp();
    }, [isAtMax, spinStopProp]);

    return {
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
