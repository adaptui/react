import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";

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
  >;

export type DatePickerHTMLProps = BoxHTMLProps;

export type DatePickerProps = DatePickerOptions & DatePickerHTMLProps;

const isTouch = Boolean(
  "ontouchstart" in window ||
    window.navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0,
);

export const useDatePicker = createHook<DatePickerOptions, DatePickerHTMLProps>(
  {
    name: "DatePicker",
    compose: useBox,
    keys: DATE_PICKER_KEYS,

    useProps(
      options,
      { onKeyDown: htmlOnKeyDown, onClick: htmlOnClick, ...htmlProps },
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
      } = options;

      // Open the popover on alt + arrow down
      const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.altKey && e.key === "ArrowDown") {
          e.preventDefault();
          e.stopPropagation();
          show;
        }
      };

      const onClick = (e: React.MouseEvent) => {
        if (isTouch) show();
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
