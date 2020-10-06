import {
  useCompositeItem,
  CompositeItemOptions,
  CompositeItemHTMLProps,
} from "reakit";
import { MouseEvent, useState } from "react";
import { mergeProps, useId } from "@react-aria/utils";
import { DOMProps } from "@react-types/shared";
import { callAllHandlers } from "@chakra-ui/utils";
import { useDateFormatter } from "@react-aria/i18n";
import { createComponent, createHook } from "reakit-system";

import { isNumeric, parseNumber } from "./__utils";
import { useSpinButton } from "../utils/useSpinButton";
import { DATE_SEGMENT_KEYS } from "../datepicker/__keys";
import { IDateSegment, SegmentStateReturn } from "./SegmentState";

export type SegmentOptions = CompositeItemOptions &
  Pick<
    SegmentStateReturn,
    | "next"
    | "dateFormatter"
    | "confirmPlaceholder"
    | "increment"
    | "decrement"
    | "incrementPage"
    | "decrementPage"
    | "setSegment"
    | "value"
  > & {
    segment: IDateSegment;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
  };

export type SegmentHTMLProps = CompositeItemHTMLProps & DOMProps;

export type SegmentProps = SegmentOptions & SegmentHTMLProps;

export const useSegment = createHook<SegmentOptions, SegmentHTMLProps>({
  name: "Segment",
  compose: useCompositeItem,
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
      ...composite,
      tabIndex: options.disabled ? -1 : 0,
    };
  },

  useProps(
    { segment, next, ...options },
    {
      onMouseDown: htmlOnMouseDown,
      onKeyDown: htmlOnKeyDown,
      onFocus: htmlOnFocus,
      ...htmlProps
    },
  ) {
    const [enteredKeys, setEnteredKeys] = useState("");

    let textValue = segment.text;
    const monthDateFormatter = useDateFormatter({ month: "long" });
    const hourDateFormatter = useDateFormatter({
      hour: "numeric",
      hour12: options.dateFormatter.resolvedOptions().hour12,
    });

    if (segment.type === "month") {
      textValue = monthDateFormatter.format(options.value);
    } else if (segment.type === "hour" || segment.type === "dayPeriod") {
      textValue = hourDateFormatter.format(options.value);
    }

    const { spinButtonProps } = useSpinButton({
      value: segment.value,
      textValue,
      minValue: segment.minValue,
      maxValue: segment.maxValue,
      isDisabled: options.isDisabled,
      isReadOnly: options.isReadOnly,
      isRequired: options.isRequired,
      onIncrement: () => options.increment(segment.type),
      onDecrement: () => options.decrement(segment.type),
      onIncrementPage: () => options.incrementPage(segment.type),
      onDecrementPage: () => options.decrementPage(segment.type),
      onIncrementToMax: () =>
        options.setSegment(segment.type, segment.maxValue as number),
      onDecrementToMin: () =>
        options.setSegment(segment.type, segment.minValue as number),
    });

    const onKeyDown = (e: any) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
        return;
      }

      switch (e.key) {
        case "Enter":
          e.preventDefault();
          if (segment.isPlaceholder && !options.isReadOnly) {
            options.confirmPlaceholder(segment.type);
          }
          next();
          break;
        case "Tab":
          break;
        case "Backspace": {
          e.preventDefault();
          if (isNumeric(segment.text) && !options.isReadOnly) {
            const newValue = segment.text.slice(0, -1);
            options.setSegment(
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
          if (
            (isNumeric(e.key) || /^[ap]$/.test(e.key)) &&
            !options.isReadOnly
          ) {
            onInput(e.key);
          }
      }
    };

    const onInput = (key: string) => {
      const newValue = enteredKeys + key;

      switch (segment.type) {
        case "dayPeriod":
          if (key === "a") {
            options.setSegment("dayPeriod", 0);
          } else if (key === "p") {
            options.setSegment("dayPeriod", 12);
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
            options.dateFormatter.resolvedOptions().hour12 &&
            numberValue === 12
          ) {
            segmentValue = 0;
          } else if (numberValue > (segment.maxValue as number)) {
            segmentValue = parseNumber(key);
          }

          options.setSegment(segment.type, segmentValue);

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

    const preventPropagation = (e: MouseEvent) => e.stopPropagation();

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
          "aria-labelledby": `${options["aria-labelledby"]} ${id}`,
          tabIndex: options.isDisabled ? undefined : 0,
          onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
          onFocus: callAllHandlers(htmlOnFocus, onFocus),
          onMouseDown: callAllHandlers(preventPropagation, htmlOnMouseDown),
          children: segment.text,
          ...htmlProps,
        });
    }
  },
});

export const Segment = createComponent({
  as: "div",
  memo: true,
  useHook: useSegment,
});
