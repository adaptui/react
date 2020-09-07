import { useCallback, useState } from "react";
import { createComponent, createHook } from "reakit-system";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit/Button";

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
    const {
      keepWithinRange,
      focusInput,
      isAtMin: isAtMinProp,
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

    const [isAtMin, setIsAtMin] = useState(false);

    const spinDown = useCallback(
      (event: any) => {
        event.preventDefault();
        spinner.down();
        focusInput();
        setIsAtMin(false);
      },
      [focusInput, spinner],
    );

    const spinStop = useCallback(
      (event: any) => {
        event.preventDefault();
        spinner.stop();

        if (isAtMinProp) {
          setIsAtMin(true);
        }
      },
      [isAtMinProp, spinner],
    );

    return {
      tabIndex: -1,
      onMouseDown: callAllHandlers(onMouseDown, spinDown),
      onTouchStart: callAllHandlers(onTouchStart, spinDown),
      onMouseLeave: callAllHandlers(onMouseUp, spinStop),
      onMouseUp: callAllHandlers(onMouseUp, spinStop),
      onTouchEnd: callAllHandlers(onTouchEnd, spinStop),
      disabled: keepWithinRange && isAtMinProp && isAtMin,
      "aria-disabled": ariaAttr(keepWithinRange && isAtMin),
      ...restHtmlProps,
    };
  },
});

export const NumberInputDecrementButton = createComponent({
  as: "button",
  memo: true,
  useHook: useNumberInputDecrementButton,
});
