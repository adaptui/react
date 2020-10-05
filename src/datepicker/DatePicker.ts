import { createOnKeyDown, isSelfTarget } from "reakit-utils";
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
    | "first"
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
      {
        onKeyDown: htmlOnKeyDown,
        onClick: htmlOnClick,
        onFocus: htmlOnFocus,
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
      console.log("%c options", "color: #00bf00", options);

      const onClick = (e: React.MouseEvent) => {
        if (isTouch) {
          show();
        }
      };

      // Open the popover on alt + arrow down
      const onKeyDown = createOnKeyDown({
        onKey: htmlOnKeyDown,
        preventDefault: false,
        keyMap: event => {
          const isAlt = event.altKey;

          return {
            ArrowDown: () => {
              event.preventDefault();
              event.stopPropagation();
              isAlt && show();
            },
          };
        },
      });

      const onFocus = (e: React.FocusEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSelfTarget(e)) {
          first();
        }
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
        onFocus: callAllHandlers(htmlOnFocus, onFocus),
        tabIndex: -1,
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
