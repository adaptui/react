import { createOnKeyDown } from "reakit-utils";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";

import { isTouch } from "../utils";
import { DATE_PICKER_KEYS } from "./__keys";
import { DatePickerStateReturn } from "./DatePickerState";

export type DatePickerOptions = BoxOptions &
  Pick<
    DatePickerStateReturn,
    | "visible"
    | "validationState"
    | "isDisabled"
    | "isReadOnly"
    | "isRequired"
    | "show"
    | "pickerId"
    | "dialogId"
    | "first"
  >;

export type DatePickerHTMLProps = BoxHTMLProps;

export type DatePickerProps = DatePickerOptions & DatePickerHTMLProps;

export const useDatePicker = createHook<DatePickerOptions, DatePickerHTMLProps>(
  {
    name: "DatePicker",
    compose: useBox,
    keys: DATE_PICKER_KEYS,

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
        validationState,
        isDisabled,
        isReadOnly,
        isRequired,
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
        "aria-invalid": ariaAttr(validationState === "invalid"),
        "aria-disabled": ariaAttr(isDisabled),
        "aria-readonly": ariaAttr(isReadOnly),
        "aria-required": ariaAttr(isRequired),
        onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
        onClick: callAllHandlers(htmlOnClick, onClick),
        onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
        ...htmlProps,
      };
    },
  },
);

export const DatePicker = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePicker,
});
