import { createOnKeyDown } from "reakit-utils";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";

import { isTouch } from "../utils";
import { TIME_PICKER_KEYS } from "./__keys";
import { TimePickerStateReturn } from "./TimePickerState";

export type TimePickerOptions = BoxOptions &
  Pick<
    TimePickerStateReturn,
    | "visible"
    | "isDisabled"
    | "isReadOnly"
    | "show"
    | "pickerId"
    | "dialogId"
    | "first"
  >;

export type TimePickerHTMLProps = BoxHTMLProps;

export type TimePickerProps = TimePickerOptions & TimePickerHTMLProps;

export const useTimePicker = createHook<TimePickerOptions, TimePickerHTMLProps>(
  {
    name: "TimePicker",
    compose: useBox,
    keys: TIME_PICKER_KEYS,

    useProps(
      options,
      {
        onKeyDown: htmlOnKeyDown,
        onClick: htmlOnClick,
        onMouseDown: htmlOnMouseDown,
        ...htmlProps
      },
    ) {
      const {
        visible,
        isDisabled,
        isReadOnly,
        show,
        pickerId,
        dialogId,
        first,
      } = options;

      const onClick = () => {
        if (isTouch()) show();
      };

      // Open the popover on alt + arrow down
      const onKeyDown = createOnKeyDown({
        onKey: htmlOnKeyDown,
        preventDefault: true,
        keyMap: event => {
          const isAlt = event.altKey;

          return {
            ArrowDown: () => {
              isAlt && show();
            },
          };
        },
      });

      const onMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        first();
      };

      return {
        id: pickerId,
        role: "combobox",
        "aria-haspopup": "dialog",
        "aria-expanded": visible,
        "aria-owns": visible ? dialogId : undefined,
        "aria-disabled": ariaAttr(isDisabled),
        "aria-readonly": ariaAttr(isReadOnly),
        onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
        onClick: callAllHandlers(htmlOnClick, onClick),
        onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
        ...htmlProps,
      };
    },
  },
);

export const TimePicker = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePicker,
});
