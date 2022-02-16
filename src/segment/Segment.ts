import * as React from "react";
import {
  CompositeItemHTMLProps,
  CompositeItemOptions,
  useCompositeItem,
} from "reakit";
import { callAllHandlers } from "@chakra-ui/utils";
import { useDateFormatter } from "@react-aria/i18n";
import { useSpinButton } from "@react-aria/spinbutton";
import { mergeProps } from "@react-aria/utils";

import { createComponent, createHook } from "../system";
import { dataAttr } from "../utils";

import { SEGMENT_KEYS } from "./__keys";
import { isNumeric, parseNumber } from "./helpers";
import { DateSegment, SegmentStateReturn } from "./SegmentState";

export type SegmentOptions = CompositeItemOptions &
  Pick<
    SegmentStateReturn,
    | "next"
    | "fieldValue"
    | "setSegment"
    | "increment"
    | "decrement"
    | "incrementPage"
    | "decrementPage"
    | "dateFormatter"
    | "confirmPlaceholder"
  > & {
    segment: DateSegment;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
  };

export type SegmentHTMLProps = CompositeItemHTMLProps;

export type SegmentProps = SegmentOptions & SegmentHTMLProps;

export const useSegment = createHook<SegmentOptions, SegmentHTMLProps>({
  name: "Segment",
  compose: useCompositeItem,
  keys: SEGMENT_KEYS,

  useOptions(options, _) {
    return {
      disabled:
        options.isDisabled ||
        options.isReadOnly ||
        options.segment.type === "literal",
      ...options,
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
    const [enteredKeys, setEnteredKeys] = React.useState("");

    let textValue = segment.text;
    const monthDateFormatter = useDateFormatter({ month: "long" });
    const hourDateFormatter = useDateFormatter({
      hour: "numeric",
      hour12: options.dateFormatter.resolvedOptions().hour12,
    });

    const hourFormattedValue = hourDateFormatter.format(options.fieldValue);
    if (segment.type === "month") {
      textValue = monthDateFormatter.format(options.fieldValue);
    }

    if (segment.type === "hour") {
      textValue = hourFormattedValue.split(" ")[0];
    }

    if (segment.type === "dayPeriod") {
      textValue = hourFormattedValue.split(" ")[1];
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

    const onInput = React.useCallback(
      (key: string) => {
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
      },
      [enteredKeys, next, options, segment.maxValue, segment.type],
    );

    const onKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
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
      },
      [
        next,
        onInput,
        options,
        segment.isPlaceholder,
        segment.minValue,
        segment.text,
        segment.type,
      ],
    );

    const onFocus = React.useCallback(() => {
      setEnteredKeys("");
    }, []);

    const onMouseDown = React.useCallback(
      (e: React.MouseEvent) => e.stopPropagation(),
      [],
    );

    switch (segment.type) {
      // A separator, e.g. punctuation
      case "literal":
        return {
          "data-placeholder": dataAttr(false),
          children: segment.text,
          ...htmlProps,
        };

      // These segments cannot be directly edited by the user.
      case "weekday":
      case "timeZoneName":
      case "era":
        return {
          "data-placeholder": true,
          children: segment.text,
          ...htmlProps,
        };

      // Editable segment
      default:
        return mergeProps(spinButtonProps, {
          "aria-label": segment.type,
          onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
          onFocus: callAllHandlers(htmlOnFocus, onFocus),
          onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
          children: segment.text,
          ...htmlProps,
        });
    }
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
});

export const Segment = createComponent({
  as: "div",
  memo: true,
  useHook: useSegment,
});
