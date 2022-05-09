import React from "react";
import { useLocale } from "@react-aria/i18n";

import TimeFieldBasic from "../../timefield/stories/TimeFieldBasic.component";
import {
  DatePickerBaseStateProps,
  useDatePickerBaseState,
} from "../timepicker-base-state";
import { DatePickerDisclosure } from "../timepicker-disclosure";
import { DatePickerGroup } from "../timepicker-group";
import { DatePickerPopover } from "../timepicker-popover";
import { useDatePickerState } from "../timepicker-state";

import { CalendarIcon } from "./Utils.component";

export type TimePickerBasicProps = DatePickerBaseStateProps & {};

export const TimePickerBasic: React.FC<TimePickerBasicProps> = props => {
  const { locale } = useLocale();
  const state = useDatePickerBaseState({ ...props, gutter: 10 });
  console.log("%cstate", "color: #0088cc", state.datepicker);
  const datepicker = useDatePickerState({ ...props, state });
  console.log("%cdatepicker", "color: #917399", datepicker.fieldProps);

  return (
    <div style={{ position: "relative" }} className="datepicker">
      <DatePickerGroup
        state={datepicker}
        className="datepicker__header"
        aria-label="DatePicker"
      >
        <TimeFieldBasic
          {...datepicker.fieldProps}
          granularity="minute"
          locale={locale}
        />
        <DatePickerDisclosure
          state={datepicker}
          className="datepicker__trigger"
        >
          <CalendarIcon />
        </DatePickerDisclosure>
        {state.popover.visible && (
          <DatePickerPopover state={datepicker} className="popover">
            <TimePickerColumn />
          </DatePickerPopover>
        )}
      </DatePickerGroup>
    </div>
  );
};

export default TimePickerBasic;

export const TimePickerColumn: React.FC = props => {
  return <div>Time</div>;
};
