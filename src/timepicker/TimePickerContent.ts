import * as React from "react";
import { createHook } from "reakit-system";
import { createOnKeyDown, useForkRef } from "reakit-utils";
import { focus, getNextTabbable, getPreviousTabbable } from "@chakra-ui/utils";

import {
  PickerBaseContentHTMLProps,
  PickerBaseContentOptions,
  usePickerBaseContent,
} from "../picker-base";
import { createComponent } from "../system";

import { TIME_PICKER_CONTENT_KEYS } from "./__keys";

export type TimePickerContentOptions = PickerBaseContentOptions;

export type TimePickerContentHTMLProps = PickerBaseContentHTMLProps;

export type TimePickerContentProps = TimePickerContentOptions &
  TimePickerContentHTMLProps;

export const useTimePickerContent = createHook<
  TimePickerContentOptions,
  TimePickerContentHTMLProps
>({
  name: "TimePickerContent",
  compose: usePickerBaseContent,
  keys: TIME_PICKER_CONTENT_KEYS,

  useProps(_, { ref: htmlRef, onKeyDown: htmlOnKeyDown, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);

    const onKeyDown = React.useMemo(() => {
      return createOnKeyDown({
        onKeyDown: htmlOnKeyDown,
        keyMap: () => {
          return {
            ArrowRight: () => {
              if (!ref.current) return;

              const nextTabbableElement = getNextTabbable(ref.current);
              if (nextTabbableElement) {
                focus(nextTabbableElement);
              }
            },
            ArrowLeft: () => {
              if (!ref.current) return;

              const previousTabbableElement = getPreviousTabbable(ref.current);
              if (previousTabbableElement) {
                focus(previousTabbableElement);
              }
            },
          };
        },
      });
    }, [htmlOnKeyDown]);

    return { ref: useForkRef(ref, htmlRef), onKeyDown, ...htmlProps };
  },
});

export const TimePickerContent = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerContent,
});
