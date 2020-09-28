import * as React from "react";
import { Meta } from "@storybook/react";

import { Composite, CompositeItem, useCompositeState } from "reakit";
import { TimePickerColumn } from "../TimePickerColumn";
import { TimePickerColumnValue } from "../TimePickerColumnValue";
import { useTimePickerColumnState } from "../TimePickerColumnState";

import "./index.css";

export default {
  title: "Component/TimePicker",
} as Meta;

const TimePickerComp: React.FC<any> = props => {
  const state1 = useTimePickerColumnState();
  const state2 = useTimePickerColumnState();
  const composite = useCompositeState({ orientation: "horizontal" });

  return (
    <>
      <Composite className="timepicker" {...composite}>
        <TimePickerColumn className="timepicker__column" {...state1}>
          {[...new Array(12).keys()].map(n => {
            return (
              <TimePickerColumnValue value={n} {...state1}>
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
        <TimePickerColumn className="timepicker__column" {...state2}>
          {[...new Array(60).keys()].map(n => {
            return (
              <TimePickerColumnValue value={n} {...state2}>
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
      </Composite>
    </>
  );
};

export const Default = () => <TimePickerComp />;
