import { useState, useCallback } from "react";
import { callAllHandlers } from "@chakra-ui/utils";

import { ariaAttr } from "../utils";
import {
  NumberInputButtonHTMLProps,
  NumberInputButtonOptions,
} from "./createNumberInputButtonsHook";

export function useNumberInputButton(
  options: NumberInputButtonOptions,
  htmlProps: NumberInputButtonHTMLProps,
  action = "increment",
) {
  const {
    keepWithinRange,
    focusInput,
    isAtMin,
    isAtMax,
    spinUp,
    spinDown,
    spinStop,
  } = options;
  const {
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    ...restHtmlProps
  } = htmlProps;

  console.log("%c isAtMin", "color: #ffa280", isAtMin);
  console.log("%c isAtMin", "color: #ffa280", isAtMax);
  // const [isAtMin, setIsAtMin] = useState(false);
  // const [isAtMax, setIsAtMax] = useState(false);

  // const spinUp = useCallback(
  //   (event: any) => {
  //     event.preventDefault();
  //     spinUpProp();
  //     focusInput();
  //     setIsAtMax(false);
  //   },
  //   [focusInput, spinUpProp],
  // );

  // const spinDown = useCallback(
  //   (event: any) => {
  //     event.preventDefault();
  //     spinDownProp();
  //     focusInput();
  //     setIsAtMin(false);
  //   },
  //   [focusInput, spinDownProp],
  // );

  // const spinStop = useCallback(
  //   (event: any) => {
  //     event.preventDefault();
  //     spinStopProp();

  //     if (action === "increment") {
  //       isAtMaxProp && setIsAtMax(true);
  //     } else {
  //       isAtMinProp && setIsAtMin(true);
  //     }
  //   },
  //   [action, isAtMaxProp, isAtMinProp, spinStopProp],
  // );

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
      disabled: keepWithinRange && isAtMax,
      "aria-disabled": ariaAttr(keepWithinRange && isAtMax),
      ...commonReturn,
    };
  }

  return {
    onMouseDown: callAllHandlers(onMouseDown, spinDown),
    onTouchStart: callAllHandlers(onTouchStart, spinDown),
    disabled: keepWithinRange && isAtMin,
    "aria-disabled": ariaAttr(keepWithinRange && isAtMin),
    ...commonReturn,
  };
}
