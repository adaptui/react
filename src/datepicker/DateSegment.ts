import {
  useBox,
  BoxOptions,
  BoxHTMLProps,
  useCompositeItem,
  CompositeItemOptions,
  CompositeItemHTMLProps,
} from "reakit";
import { MouseEvent, useState } from "react";
import { DOMProps } from "@react-types/shared";
import { useDateFormatter } from "@react-aria/i18n";
import { mergeProps, useId } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";

import { DatePickerProps } from "./index.d";
import { DATE_SEGMENT_KEYS } from "./__keys";
import { isNumeric, parseNumber } from "./__utils";
import { useSpinButton } from "../utils/useSpinButton";
import { DatePickerFieldState, IDateSegment } from "./DatePickerFieldState";

export type DateSegmentOptions = CompositeItemOptions &
  BoxOptions &
  DatePickerFieldState &
  DatePickerProps & {
    segment: IDateSegment;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
  };

export type DateSegmentHTMLProps = CompositeItemHTMLProps &
  BoxHTMLProps &
  DOMProps;

export type DateSegmentProps = DateSegmentOptions & DateSegmentHTMLProps;

export const useDateSegment = createHook<
  DateSegmentOptions,
  DateSegmentHTMLProps
>({
  name: "DateSegment",
  compose: [useBox, useCompositeItem],
  keys: DATE_SEGMENT_KEYS,

  useOptions(options, htmlProps) {
    return {
      disabled: options.segment.type === "literal",
      ...options,
    };
  },

  useComposeProps(options, htmlProps) {
    const composite = useCompositeItem(options, htmlProps);

    /*
      Haz: 
      Ensure tabIndex={0} 
      Tab is not the only thing that can move focus in web pages
      For example, on iOS you can move between form elements using 
      the arrows above the keyboard
    */
    return {
      ...htmlProps,
      ...composite,
      tabIndex: options.segment.type === "literal" ? -1 : 0,
    };
  },

  useProps({ segment, next, previous, ...state }, htmlProps) {
    const [enteredKeys, setEnteredKeys] = useState("");

    let textValue = segment.text;
    const monthDateFormatter = useDateFormatter({ month: "long" });
    const hourDateFormatter = useDateFormatter({
      hour: "numeric",
      hour12: state.dateFormatter.resolvedOptions().hour12,
    });

    if (segment.type === "month") {
      textValue = monthDateFormatter.format(state.value);
    } else if (segment.type === "hour" || segment.type === "dayPeriod") {
      textValue = hourDateFormatter.format(state.value);
    }

    const { spinButtonProps } = useSpinButton({
      value: segment.value,
      textValue,
      minValue: segment.minValue,
      maxValue: segment.maxValue,
      isDisabled: state.isDisabled,
      isReadOnly: state.isReadOnly,
      isRequired: state.isRequired,
      onIncrement: () => state.increment(segment.type),
      onDecrement: () => state.decrement(segment.type),
      onIncrementPage: () => state.incrementPage(segment.type),
      onDecrementPage: () => state.decrementPage(segment.type),
      onIncrementToMax: () =>
        state.setSegment(segment.type, segment.maxValue as number),
      onDecrementToMin: () =>
        state.setSegment(segment.type, segment.minValue as number),
    });

    const onKeyDown = (e: any) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
        return;
      }

      switch (e.key) {
        case "Enter":
          e.preventDefault();
          if (segment.isPlaceholder && !state.isReadOnly) {
            state.confirmPlaceholder(segment.type);
          }
          next();
          break;
        case "Tab":
          break;
        case "Backspace": {
          e.preventDefault();
          if (isNumeric(segment.text) && !state.isReadOnly) {
            const newValue = segment.text.slice(0, -1);
            state.setSegment(
              segment.type,
              newValue.length === 0
                ? (segment.minValue as number)
                : parseNumber(newValue),
            );
            setEnteredKeys(newValue);
          }
          break;
        }
        default:
          e.preventDefault();
          e.stopPropagation();
          if ((isNumeric(e.key) || /^[ap]$/.test(e.key)) && !state.isReadOnly) {
            onInput(e.key);
          }
      }
    };

    const onInput = (key: string) => {
      const newValue = enteredKeys + key;

      switch (segment.type) {
        case "dayPeriod":
          if (key === "a") {
            state.setSegment("dayPeriod", 0);
          } else if (key === "p") {
            state.setSegment("dayPeriod", 12);
          }
          next();
          break;
        case "day":
        case "hour":
        case "minute":
        case "second":
        case "month":
        case "year": {
          if (!isNumeric(newValue)) {
            return;
          }

          const numberValue = parseNumber(newValue);
          let segmentValue = numberValue;
          if (
            segment.type === "hour" &&
            state.dateFormatter.resolvedOptions().hour12 &&
            numberValue === 12
          ) {
            segmentValue = 0;
          } else if (numberValue > (segment.maxValue as number)) {
            segmentValue = parseNumber(key);
          }

          state.setSegment(segment.type, segmentValue);

          if (Number(numberValue + "0") > (segment.maxValue as number)) {
            setEnteredKeys("");
            next();
          } else {
            setEnteredKeys(newValue);
          }
          break;
        }
      }
    };

    const onFocus = () => {
      setEnteredKeys("");
    };

    const id = useId(htmlProps.id);

    switch (segment.type) {
      // A separator, e.g. punctuation
      case "literal":
        return {
          role: "presentation",
          "data-placeholder": false,
          children: segment.text,
          ...htmlProps,
        };

      // These segments cannot be directly edited by the user.
      case "weekday":
      case "timeZoneName":
      case "era":
        return {
          role: "presentation",
          "data-placeholder": true,
          children: segment.text,
          ...htmlProps,
        };

      // Editable segment
      default:
        return mergeProps(spinButtonProps, {
          id,
          "aria-label": segment.type,
          "aria-labelledby": `${state["aria-labelledby"]} ${id}`,
          tabIndex: state.isDisabled ? undefined : 0,
          onKeyDown,
          onFocus,
          onMouseDown: (e: MouseEvent) => e.stopPropagation(),
          children: segment.text,
          ...htmlProps,
        });
    }
  },
});

export const DateSegment = createComponent({
  as: "div",
  memo: true,
  useHook: useDateSegment,
});
