/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { useMemo, useState } from "react";
import { useDateFormatter } from "@react-aria/i18n";
import { useControlledState } from "@react-stately/utils";

import { DatePickerProps } from "./index.d";
import { add, setSegment, convertValue, getSegmentLimits } from "./__utils";

export interface IDateSegment {
  type: Intl.DateTimeFormatPartTypes;
  text: string;
  value?: number;
  minValue?: number;
  maxValue?: number;
  isPlaceholder: boolean;
}

export interface DatePickerFieldState {
  value: Date;
  setValue: (value: Date) => void;
  segments: IDateSegment[];
  dateFormatter: Intl.DateTimeFormat;
  increment: (type: Intl.DateTimeFormatPartTypes) => void;
  decrement: (type: Intl.DateTimeFormatPartTypes) => void;
  incrementPage: (type: Intl.DateTimeFormatPartTypes) => void;
  decrementPage: (type: Intl.DateTimeFormatPartTypes) => void;
  setSegment: (type: Intl.DateTimeFormatPartTypes, value: number) => void;
  confirmPlaceholder: (type: Intl.DateTimeFormatPartTypes) => void;
}

const EDITABLE_SEGMENTS = {
  year: true,
  month: true,
  day: true,
  hour: true,
  minute: true,
  second: true,
  dayPeriod: true,
};

const PAGE_STEP = {
  year: 5,
  month: 2,
  day: 7,
  hour: 2,
  minute: 15,
  second: 15,
};

// Node seems to convert everything to lowercase...
const TYPE_MAPPING = {
  dayperiod: "dayPeriod",
};

export function useDatePickerFieldState(
  props: DatePickerProps,
): DatePickerFieldState {
  const [validSegments, setValidSegments] = useState(
    props.value || props.defaultValue ? { ...EDITABLE_SEGMENTS } : {},
  );

  const dateFormatter = useDateFormatter(props.formatOptions);
  const resolvedOptions = useMemo(() => dateFormatter.resolvedOptions(), [
    dateFormatter,
  ]);

  // Determine how many editable segments there are for validation purposes.
  // The result is cached for performance.
  const numSegments = useMemo(
    () =>
      dateFormatter
        .formatToParts(new Date())
        .filter(seg => EDITABLE_SEGMENTS[seg.type]).length,
    [dateFormatter],
  );

  // If there is a value prop, and some segments were previously placeholders, mark them all as valid.
  if (props.value && Object.keys(validSegments).length < numSegments) {
    setValidSegments({ ...EDITABLE_SEGMENTS });
  }

  // We keep track of the placeholder date separately in state so that onChange is not called
  // until all segments are set. If the value === null (not undefined), then assume the component
  // is controlled, so use the placeholder as the value until all segments are entered so it doesn't
  // change from uncontrolled to controlled and emit a warning.
  const [placeholderDate, setPlaceholderDate] = useState(
    convertValue(props.placeholderDate) ||
      new Date(new Date().getFullYear(), 0, 1),
  );
  const [date, setDate] = useControlledState<Date>(
    // @ts-ignore
    props.value === null
      ? convertValue(placeholderDate)
      : convertValue(props.value),
    convertValue(props.defaultValue),
    props.onChange,
  );

  // If all segments are valid, use the date from state, otherwise use the placeholder date.
  const value =
    Object.keys(validSegments).length >= numSegments ? date : placeholderDate;
  const setValue = (value: Date) => {
    if (Object.keys(validSegments).length >= numSegments) {
      setDate(value);
    } else {
      setPlaceholderDate(value);
    }
  };

  const segments = dateFormatter.formatToParts(value).map(
    segment =>
      ({
        type: TYPE_MAPPING[segment.type] || segment.type,
        text: segment.value,
        ...getSegmentLimits(value, segment.type, resolvedOptions),
        isPlaceholder: !validSegments[segment.type],
      } as IDateSegment),
  );

  const adjustSegment = (
    type: Intl.DateTimeFormatPartTypes,
    amount: number,
  ) => {
    validSegments[type] = true;
    setValidSegments({ ...validSegments });
    // @ts-ignore
    setValue(add(value, type, amount, resolvedOptions));
  };

  return {
    value,
    setValue,
    segments,
    dateFormatter,
    increment(part) {
      adjustSegment(part, 1);
    },
    decrement(part) {
      adjustSegment(part, -1);
    },
    incrementPage(part) {
      adjustSegment(part, PAGE_STEP[part] || 1);
    },
    decrementPage(part) {
      adjustSegment(part, -(PAGE_STEP[part] || 1));
    },
    setSegment(part, v) {
      validSegments[part] = true;
      setValidSegments({ ...validSegments });
      // @ts-ignore
      setValue(setSegment(value, part, v, resolvedOptions));
    },
    confirmPlaceholder(part) {
      validSegments[part] = true;
      setValidSegments({ ...validSegments });
      setValue(new Date(value));
    },
  };
}

export type DatePickerFieldStateReturn = ReturnType<
  typeof useDatePickerFieldState
>;
