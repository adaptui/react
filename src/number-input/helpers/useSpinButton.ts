import { useState, useCallback } from "react";
import { callAllHandlers } from "@chakra-ui/utils";
import { ButtonHTMLProps, ButtonOptions } from "reakit";

import { ariaAttr } from "../../utils";
import { NumberInputStateReturn } from "../NumberInputState";

type UseSpinButtonOptions = ButtonOptions &
  Pick<
    Partial<NumberInputStateReturn>,
    "keepWithinRange" | "isAtMin" | "isAtMax"
  > &
  Pick<
    NumberInputStateReturn,
    "focusInput" | "increment" | "decrement" | "spinner"
  >;

type UseSpinButtonHTMLProps = ButtonHTMLProps;

export function useSpinButton(
  options: UseSpinButtonOptions,
  htmlProps: UseSpinButtonHTMLProps,
  action = "increment",
) {
  const {
    keepWithinRange,
    focusInput,
    isAtMin: isAtMinProp,
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

  const [isAtMin, setIsAtMin] = useState(false);
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

      if (action === "increment") {
        isAtMaxProp && setIsAtMax(true);
      } else {
        isAtMinProp && setIsAtMin(true);
      }
    },
    [action, isAtMaxProp, isAtMinProp, spinner],
  );

  const commonReturn = {
    tabIndex: -1,
    onMouseUp: callAllHandlers(onMouseUp, spinStop),
    onMouseLeave: callAllHandlers(onMouseLeave, spinStop),
    onTouchEnd: callAllHandlers(onTouchEnd, spinStop),
    ...restHtmlProps,
  };

  if (action === "increment") {
    return {
      onMouseDown: callAllHandlers(onMouseDown, spinUp),
      onTouchStart: callAllHandlers(onTouchStart, spinUp),
      disabled: keepWithinRange && isAtMaxProp && isAtMax,
      "aria-disabled": ariaAttr(keepWithinRange && isAtMaxProp && isAtMax),
      ...commonReturn,
    };
  }

  return {
    onMouseDown: callAllHandlers(onMouseDown, spinDown),
    onTouchStart: callAllHandlers(onTouchStart, spinDown),
    disabled: keepWithinRange && isAtMinProp && isAtMin,
    "aria-disabled": ariaAttr(keepWithinRange && isAtMinProp && isAtMin),
    ...commonReturn,
  };
}
