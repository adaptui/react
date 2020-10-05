/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useDatePickerState](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/datepicker/src/useDatePickerState.ts)
 * to work with Reakit System
 */

import * as React from "react";
import { useControllableState } from "@chakra-ui/hooks";
import {
  useCompositeState,
  usePopoverState,
  unstable_useId as useId,
} from "reakit";

import { setTime, isInvalid } from "./__utils";
import { useDatePickerFieldState } from "./DatePickerFieldState";
import { DatePickerStateInitialProps, ValidationState } from "./index.d";
import { useCalendarState } from "../calendar";

export const useDatePickerState = (props: DatePickerStateInitialProps = {}) => {
  const {
    value: initialValue,
    defaultValue = new Date(),
    onChange,
    minValue,
    maxValue,
    isDisabled,
    isReadOnly,
    isRequired,
    pickerId: pickerIdProp,
    dialogId: dialogIdProp,
    formatOptions,
    placeholderDate,
  } = props;

  const { id: pickerId } = useId({ id: pickerIdProp, baseId: "picker" });
  const { id: dialogId } = useId({ id: dialogIdProp, baseId: "dialog" });

  const [value, setValue] = useControllableState({
    value: initialValue,
    defaultValue,
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });
  const dateValue = value != null ? new Date(value) : undefined;

  // Intercept setValue to make sure the Time section is not changed by date selection in Calendar
  const selectDate = (newValue: Date) => {
    if (dateValue) {
      setTime(newValue, dateValue);
    }

    setValue(newValue);
    popover.hide();
  };

  const popover = usePopoverState(props);
  const composite = useCompositeState({ orientation: "horizontal" });
  const fieldState = useDatePickerFieldState({
    value: dateValue,
    defaultValue,
    onChange: setValue,
    formatOptions,
    placeholderDate,
  });
  const calendar = useCalendarState({
    value: dateValue,
    defaultValue,
    // @ts-ignore
    onChange: selectDate,
  });

  const validationState: ValidationState =
    props.validationState ||
    (isInvalid(dateValue, props.minValue, props.maxValue)
      ? "invalid"
      : "valid");

  React.useEffect(() => {
    if (popover.visible) {
      calendar.setFocused(true);
      dateValue && calendar.focusCell(dateValue);
    }

    if (!popover.visible) {
      composite.first();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popover.visible]);

  return {
    pickerId,
    dialogId,
    dateValue,
    setDateValue: setValue,
    selectDate,
    validationState,
    minValue,
    maxValue,
    isDisabled,
    isReadOnly,
    isRequired,
    ...composite,
    ...popover,
    ...fieldState,
    calendar,
  };
};

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>;
