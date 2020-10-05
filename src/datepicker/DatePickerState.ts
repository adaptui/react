/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useDatePickerState](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/datepicker/src/useDatePickerState.ts)
 * to work with Reakit System
 */

import { useControllableState } from "@chakra-ui/hooks";
import {
  useCompositeState,
  usePopoverState,
  unstable_useId as useId,
} from "reakit";

import { setTime, isInvalid } from "./__utils";
import { useDatePickerFieldState } from "./DatePickerFieldState";
import { DatePickerStateInitialProps, ValidationState } from "./index.d";

export const useDatePickerState = (props: DatePickerStateInitialProps = {}) => {
  const {
    value: initialValue,
    defaultValue,
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
  const popover = usePopoverState(props);
  const composite = useCompositeState({ orientation: "horizontal" });
  const selectDate = (newValue: Date) => {
    if (dateValue) {
      setTime(newValue, dateValue);
    }

    setValue(newValue);
    popover.hide();
  };

  const fieldState = useDatePickerFieldState({
    value: dateValue,
    defaultValue,
    onChange: setValue,
    formatOptions,
    placeholderDate,
  });

  const validationState: ValidationState =
    props.validationState ||
    (isInvalid(dateValue, props.minValue, props.maxValue)
      ? "invalid"
      : "valid");

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
  };
};

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>;
