/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useNumberInput](https://github.com/chakra-ui/chakra-ui/blob/develop/packages/number-input/src/use-number-input.ts)
 * to work with Reakit System
 */
import {
  callAllHandlers,
  EventKeyMap,
  normalizeEventKey,
  StringOrNumber,
} from "@chakra-ui/utils";
import * as React from "react";
import { useForkRef } from "reakit-utils";
import { useEventListener } from "@chakra-ui/hooks";
import { createComponent, createHook } from "reakit-system";
import { InputHTMLProps, InputOptions, useInput } from "reakit";
import { ChangeEvent, KeyboardEvent, useCallback } from "react";

import {
  isFloatingPointNumericCharacter,
  isValidNumericKeyboardEvent,
  getStepFactor,
} from "./helpers";
import { ariaAttr } from "../utils";
import { NUMBER_INPUT_KEYS } from "./__keys";
import { NumberInputStateReturn } from "./NumberInputState";

export type NumberInputOptions = InputOptions &
  Pick<Partial<NumberInputStateReturn>, "keepWithinRange"> &
  Pick<
    NumberInputStateReturn,
    | "min"
    | "max"
    | "step"
    | "update"
    | "increment"
    | "decrement"
    | "value"
    | "valueAsNumber"
    | "isOutOfRange"
    | "cast"
    | "inputRef"
  > & {
    /**
     * This controls the value update when you blur out of the input.
     * - If `true` and the value is greater than `max`, the value will be reset to `max`
     * - Else, the value remains the same.
     *
     * @default true
     */
    clampValueOnBlur?: boolean;
    /**
     * If `true`, the input's value will change based on mouse wheel
     *
     * @default true
     */
    allowMouseWheel?: boolean;
  };

export type NumberInputHTMLProps = InputHTMLProps;

export type NumberInputProps = NumberInputOptions & NumberInputHTMLProps;

export const useNumberInput = createHook<
  NumberInputOptions,
  NumberInputHTMLProps
>({
  name: "NumberInput",
  compose: useInput,
  keys: NUMBER_INPUT_KEYS,

  useOptions({ allowMouseWheel = true, clampValueOnBlur = true, ...options }) {
    return {
      allowMouseWheel,
      clampValueOnBlur,
      ...options,
    };
  },

  useProps(
    options,
    {
      ref: htmlRef,
      onChange: htmlOnChange,
      onKeyDown: htmlOnKeyDown,
      onBlur: htmlOnBlur,
      ...htmlProps
    },
  ) {
    const {
      min,
      max,
      step,
      update,
      increment,
      decrement,
      value,
      valueAsNumber,
      clampValueOnBlur,
      cast,
      inputRef,
      disabled,
    } = options;

    /**
     * The `onChange` handler filters out any character typed
     * that isn't floating point compatible.
     */
    const onChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;

        const valueString = event.target.value
          .split("")
          .filter(isFloatingPointNumericCharacter)
          .join("");
        update(valueString);
      },
      [disabled, update],
    );

    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (disabled) return;

        /**
         * only allow valid numeric keys
         */
        if (!isValidNumericKeyboardEvent(event)) {
          event.preventDefault();
        }

        /**
         * Keyboard Accessibility
         *
         * We want to increase or decrease the input's value
         * based on if the user the arrow keys.
         *
         * @see https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-17
         */
        const stepFactor = getStepFactor(event) * step;

        const eventKey = normalizeEventKey(event);

        const keyMap: EventKeyMap = {
          ArrowUp: () => increment(stepFactor),
          ArrowDown: () => decrement(stepFactor),
          Home: () => update(min),
          End: () => update(max),
        };

        const action = keyMap[eventKey];

        if (action) {
          event.preventDefault();
          action(event);
        }
      },
      [disabled, decrement, increment, max, min, step, update],
    );

    const onBlur = useCallback(() => {
      if (!clampValueOnBlur) return;

      let next = value as StringOrNumber;

      if (next === "") return;

      if (valueAsNumber < min) {
        next = min;
      }

      if (valueAsNumber > max) {
        next = max;
      }

      /**
       * `cast` does 2 things:
       *
       * - sanitize the value by using parseFloat and some Regex
       * - used to round value to computed precision or decimal points
       */
      if (value !== next) {
        cast(next);
      }
    }, [cast, clampValueOnBlur, max, min, value, valueAsNumber]);

    useEventListener(
      "wheel",
      function onWheel(event) {
        const isInputFocused = document.activeElement === inputRef.current;
        if (!options.allowMouseWheel || !isInputFocused) return;

        event.preventDefault();

        const stepFactor = getStepFactor(event as any) * step;
        const direction = Math.sign(event.deltaY);

        if (direction === -1) {
          increment(stepFactor);
        } else if (direction === 1) {
          decrement(stepFactor);
        }
      },
      inputRef.current,
    );

    return {
      value,
      type: "text",
      role: "spinbutton",
      inputMode: "decimal",
      pattern: "[0-9]*(.[0-9]+)?",
      autoComplete: "off",
      autoCorrect: "off",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": Number.isNaN(valueAsNumber) ? undefined : valueAsNumber,
      "aria-valuetext": !value.toString() ? undefined : value.toString(),
      "aria-invalid": ariaAttr(options.isOutOfRange),
      ref: useForkRef(htmlRef, inputRef),
      onChange: callAllHandlers(htmlOnChange, onChange),
      onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
      onBlur: callAllHandlers(htmlOnBlur, onBlur),
      ...htmlProps,
    };
  },
});

export const NumberInput = createComponent({
  as: "input",
  memo: true,
  useHook: useNumberInput,
});
