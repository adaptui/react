import { useCallback, useState } from "react";
import { createComponent, createHook } from "reakit-system";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit/Button";

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
    const {
      keepWithinRange,
      focusInput,
      isAtMax: isAtMaxProp,
      spinner,
    } = options;
    const {
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      ...restHtmlProps
    } = htmlProps;

    const [isAtMax, setIsAtMax] = useState(false);

    const spinUp = useCallback(
      (event: any) => {
        event.preventDefault();
        spinner.up();
        focusInput();
        setIsAtMax(false);
      },
      [focusInput, spinner],
    );

    const spinStop = useCallback(
      (event: any) => {
        event.preventDefault();
        spinner.stop();

        if (isAtMaxProp) {
          setIsAtMax(true);
        }
      },
      [isAtMaxProp, spinner],
    );

    return {
      tabIndex: -1,
      onMouseDown: callAllHandlers(onMouseDown, spinUp),
      onTouchStart: callAllHandlers(onTouchStart, spinUp),
      onMouseUp: callAllHandlers(onMouseUp, spinStop),
      onMouseLeave: callAllHandlers(onMouseLeave, spinStop),
      onTouchEnd: callAllHandlers(onTouchEnd, spinStop),
      disabled: keepWithinRange && isAtMaxProp && isAtMax,
      "aria-disabled": ariaAttr(keepWithinRange && isAtMax),
      ...restHtmlProps,
    };
  },
});

export const NumberInputIncrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: useNumberInputIncrementButton,
});
