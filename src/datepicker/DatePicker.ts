import { createComponent, createHook } from "reakit-system";

import {
  PickerBaseHTMLProps,
  PickerBaseOptions,
  usePickerBase,
} from "../picker-base";
import { ariaAttr } from "../utils";
import { DATE_PICKER_KEYS } from "./__keys";
import { DatePickerStateReturn } from "./DatePickerState";

export type DatePickerOptions = PickerBaseOptions &
  Pick<DatePickerStateReturn, "validationState" | "isRequired">;

export type DatePickerHTMLProps = PickerBaseHTMLProps;

export type DatePickerProps = DatePickerOptions & DatePickerHTMLProps;

export const useDatePicker = createHook<DatePickerOptions, DatePickerHTMLProps>(
  {
    name: "DatePicker",
    compose: usePickerBase,
    keys: DATE_PICKER_KEYS,

    useProps(options, htmlProps) {
      const { validationState, isRequired } = options;

      return {
        "aria-invalid": ariaAttr(validationState === "invalid"),
        "aria-required": ariaAttr(isRequired),
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
