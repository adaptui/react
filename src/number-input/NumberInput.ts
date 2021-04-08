import {
  StringOrNumber,
  callAllHandlers,
  normalizeEventKey,
} from "@chakra-ui/utils";
import * as React from "react";
import { useWarning } from "reakit-warning";
import { EventKeyMap, mergeRefs } from "@chakra-ui/react-utils";
import { InputHTMLProps, InputOptions, useInput } from "reakit";
import { createComponent, createHook, useCreateElement } from "reakit-system";

import {
  sanitize,
  getStepFactor,
  isValidNumericKeyboardEvent,
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
    | "updateValue"
    | "increment"
    | "decrement"
    | "value"
    | "valueAsNumber"
    | "isOutOfRange"
    | "setCastedValue"
    | "inputRef"
    | "isInvalid"
    | "isDisabled"
    | "isReadOnly"
    | "isRequired"
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
    const disabled = options.disabled || options.isDisabled;

    return {
      allowMouseWheel,
      clampValueOnBlur,
      ...options,
      disabled,
    };
  },

  useProps(
    options,
    {
      ref: htmlRef,
      onChange: htmlOnChange,
      onKeyDown: htmlOnKeyDown,
      onFocus: htmlOnFocus,
      onBlur: htmlOnBlur,
      onWheel: htmlOnWheel,
      required: htmlRequired,
      readOnly: htmlReadOnly,
      ...htmlProps
    },
  ) {
    const {
      min,
      max,
      step,
      updateValue,
      increment,
      decrement,
      value,
      valueAsNumber,
      clampValueOnBlur,
      setCastedValue,
      inputRef,
      disabled,
      isInvalid,
      isReadOnly,
      isRequired,
      isOutOfRange,
    } = options;

    const readOnly = htmlReadOnly || isReadOnly;
    const required = htmlRequired || isRequired;

    /**
     * The `onChange` handler filters out any character typed
     * that isn't floating point compatible.
     */
    const onChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        updateValue(sanitize(event.target.value));
      },
      [updateValue],
    );

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
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
          Home: () => updateValue(min),
          End: () => updateValue(max),
        };

        const action = keyMap[eventKey];

        if (action) {
          event.preventDefault();
          action(event);
        }
      },
      [decrement, increment, max, min, step, updateValue],
    );

    const onBlur = React.useCallback(() => {
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
       * `setCastedValue` does 2 things:
       *
       * - sanitize the value by using parseFloat and some Regex
       * - used to round value to computed precision or decimal points
       */
      setCastedValue(next);
    }, [setCastedValue, clampValueOnBlur, max, min, value, valueAsNumber]);

    React.useEffect(() => {
      const input = inputRef.current;
      if (!input) return undefined;

      function onWheel(event: WheelEvent) {
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
      }

      input.addEventListener("wheel", onWheel);

      return () => {
        input.removeEventListener("wheel", onWheel);
      };
    }, [decrement, increment, inputRef, options.allowMouseWheel, step]);

    const onWheel = React.useCallback(
      (event: React.WheelEvent) => {
        if (!options.allowMouseWheel) return;

        event.preventDefault();

        const stepFactor = getStepFactor(event as any) * step;
        const direction = Math.sign(event.deltaY);

        if (direction === -1) {
          increment(stepFactor);
        } else if (direction === 1) {
          decrement(stepFactor);
        }
      },
      [decrement, increment, options.allowMouseWheel, step],
    );

    return {
      ref: mergeRefs(htmlRef, inputRef),
      value,
      type: "text",
      role: "spinbutton",
      inputMode: "decimal",
      pattern: "[0-9]*(.[0-9]+)?",
      autoComplete: "off",
      autoCorrect: "off",
      disabled,
      readOnly,
      required,
      onChange: callAllHandlers(htmlOnChange, onChange),
      onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
      onBlur: callAllHandlers(htmlOnBlur, onBlur),
      onWheel: callAllHandlers(htmlOnWheel, onWheel),
      "aria-readonly": readOnly,
      "aria-required": required,
      "aria-invalid": ariaAttr(isInvalid ?? isOutOfRange),
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": Number.isNaN(valueAsNumber) ? undefined : valueAsNumber,
      "aria-valuetext": !value.toString() ? undefined : value.toString(),
      ...htmlProps,
    };
  },
});

export const NumberInput = createComponent({
  as: "input",
  memo: true,
  useHook: useNumberInput,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://www.w3.org/TR/wai-aria-1.1/#spinbutton",
    );
    return useCreateElement(type, props, children);
  },
});
