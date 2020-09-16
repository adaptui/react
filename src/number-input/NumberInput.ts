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
  normalizeEventKey,
  StringOrNumber,
} from "@chakra-ui/utils";
import {
  ChangeEvent,
  KeyboardEvent,
  InputHTMLAttributes,
  useCallback,
} from "react";

import { NUMBER_INPUT_KEYS } from "./__keys";
import { NumberInputStateReturn } from "./NumberInputState";
import {
  isFloatingPointNumericCharacter,
  isValidNumericKeyboardEvent,
  getStepFactor,
} from "./__utils";

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
    | "setFocused"
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
type InputMode = InputHTMLAttributes<any>["inputMode"];

export const useNumberInput = createHook<
  NumberInputOptions,
  NumberInputHTMLProps
>({
  name: "NumberInput",
  compose: useInput,
  keys: NUMBER_INPUT_KEYS,

  useProps(options, htmlProps) {
    const {
      getAriaValueText,
      clampValueOnBlur,
      min,
      max,
      step: stepProp,
      isReadOnly,
      isDisabled,
      inputRef,
      setFocused,
      update,
      increment,
      decrement,
      value,
      valueAsNumber,
      isOutOfRange,
      cast,
    } = options;
    const {
      ref,
      onChange: htmlOnChange,
      onWheel: htmlOnWheel,
      onKeyDown: htmlOnKeyDown,
      onFocus,
      onBlur: htmlOnBlur,
      ...restHtmlProps
    } = htmlProps;

    /**
     * If user would like to use a human-readable representation
     * of the value, rather than the value itself they can pass `getAriaValueText`
     *
     * @see https://www.w3.org/TR/wai-aria-practices-1.1/#wai-aria-roles-states-and-properties-18
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext
     */
    const ariaValueText =
      value === null || value === ""
        ? undefined
        : getAriaValueText?.(value) ?? String(value);

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

        switch (eventKey) {
          case "ArrowUp":
            event.preventDefault();
            increment(stepFactor);
            break;
          case "ArrowDown":
            event.preventDefault();
            decrement(stepFactor);
            break;
          case "Home":
            event.preventDefault();
            update(min);
            break;
          case "End":
            event.preventDefault();
            update(max);
            break;
          default:
            break;
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
      setFocused.off();

      if (clampValueOnBlur) {
        validateAndClamp();
      }
    }, [clampValueOnBlur, setFocused, validateAndClamp]);

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
      inputMode: "numeric" as InputMode,
      pattern: "[0-9]*",
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
      ref: useForkRef(inputRef, ref),
      onChange: callAllHandlers(htmlOnChange, onChange),
      onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
      onFocus: callAllHandlers(onFocus, setFocused.on),
      onBlur: callAllHandlers(htmlOnBlur, onBlur),
      onWheel: callAllHandlers(htmlOnWheel, onWheel),
      ...restHtmlProps,
    };
  },
});

export const NumberInput = createComponent({
  as: "input",
  memo: true,
  useHook: useNumberInput,
});
