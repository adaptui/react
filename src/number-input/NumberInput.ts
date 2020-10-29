/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useNumberInput](https://github.com/chakra-ui/chakra-ui/blob/develop/packages/number-input/src/use-number-input.ts)
 * to work with Reakit System
 */
import { useForkRef } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import { InputHTMLProps, InputOptions, useInput } from "reakit";
import {
  callAllHandlers,
  EventKeyMap,
  normalizeEventKey,
  StringOrNumber,
} from "@chakra-ui/utils";
import { ChangeEvent, KeyboardEvent, useCallback } from "react";

import { NUMBER_INPUT_KEYS } from "./__keys";
import { NumberInputStateReturn } from "./NumberInputState";
import {
  isFloatingPointNumericCharacter,
  isValidNumericKeyboardEvent,
  getStepFactor,
} from "./helpers";
import { isNull } from "../utils";

export type NumberInputOptions = InputOptions &
  Pick<
    Partial<NumberInputStateReturn>,
    "keepWithinRange" | "clampValueOnBlur" | "isReadOnly" | "isDisabled"
  > &
  Pick<
    NumberInputStateReturn,
    | "min"
    | "max"
    | "step"
    | "isAtMax"
    | "inputRef"
    | "update"
    | "increment"
    | "decrement"
    | "value"
    | "valueAsNumber"
    | "isOutOfRange"
    | "cast"
  > & {
    /**
     * This is used to format the value so that screen readers
     * can speak out a more human-friendly value.
     *
     * It is used to set the `aria-valuetext` property of the input
     */
    getAriaValueText?(value: StringOrNumber): string;
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

  useProps(
    options,
    {
      ref: htmlRef,
      onChange: htmlOnChange,
      onWheel: htmlOnWheel,
      onKeyDown: htmlOnKeyDown,
      onBlur: htmlOnBlur,
      ...htmlProps
    },
  ) {
    const {
      getAriaValueText,
      clampValueOnBlur,
      min,
      max,
      step: stepProp,
      isReadOnly,
      isDisabled,
      inputRef,
      update,
      increment,
      decrement,
      value,
      valueAsNumber,
      isOutOfRange,
      cast,
    } = options;

    /**
     * If user would like to use a human-readable representation
     * of the value, rather than the value itself they can pass `getAriaValueText`
     *
     * @see https://www.w3.org/TR/wai-aria-practices-1.1/#wai-aria-roles-states-and-properties-18
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext
     */
    const _getAriaValueText = () => {
      const text = getAriaValueText?.(value);
      if (!isNull(text)) {
        return text;
      }

      const defaultText = value.toString();
      // empty string is an invalid ARIA attribute value
      return !defaultText ? undefined : defaultText;
    };

    const ariaValueText = _getAriaValueText();

    /**
     * The `onChange` handler filters out any character typed
     * that isn't floating point compatible.
     */
    const onChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const valueString = event.target.value
          .split("")
          .filter(isFloatingPointNumericCharacter)
          .join("");
        update(valueString);
      },
      [update],
    );

    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
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
        const stepFactor = getStepFactor(event) * stepProp;

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
      [decrement, increment, max, min, stepProp, update],
    );

    /**
     * Function that clamps the input's value on blur
     */
    const validateAndClamp = useCallback(() => {
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
    }, [cast, max, min, value, valueAsNumber]);

    const onBlur = useCallback(() => {
      if (clampValueOnBlur) {
        validateAndClamp();
      }
    }, [clampValueOnBlur, validateAndClamp]);

    const onWheel = useCallback(
      event => {
        event.preventDefault();
        const stepFactor = getStepFactor(event) * stepProp;
        const wheelDirection = Math.sign(event.deltaY);

        if (wheelDirection === -1) {
          increment(stepFactor);
        } else if (wheelDirection === 1) {
          decrement(stepFactor);
        }
      },
      [increment, decrement, stepProp],
    );

    return {
      value,
      role: "spinbutton",
      type: "text",
      inputMode: "decimal",
      pattern: "[0-9]*(.[0-9]+)?",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": isNaN(valueAsNumber) ? undefined : valueAsNumber,
      "aria-valuetext": ariaValueText,
      "aria-invalid": isOutOfRange,
      "aria-disabled": isDisabled,
      readOnly: isReadOnly,
      disabled: isDisabled,
      autoComplete: "off",
      autoCorrect: "off",
      ref: useForkRef(inputRef, htmlRef),
      onChange: callAllHandlers(htmlOnChange, onChange),
      onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
      onBlur: callAllHandlers(htmlOnBlur, onBlur),
      onWheel: callAllHandlers(htmlOnWheel, onWheel),
      ...htmlProps,
    };
  },
});

export const NumberInput = createComponent({
  as: "input",
  memo: true,
  useHook: useNumberInput,
});
