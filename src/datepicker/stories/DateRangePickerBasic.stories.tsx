import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./DateRangePickerBasic.css";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import js from "./templates/DatePickerBasicJsx";
import ts from "./templates/DatePickerBasicTsx";
import css from "./templates/DatePickerBasicCss";
import { createPreviewTabs } from "../../../.storybook/utils";
import { DateRangePicker } from "./DateRangePickerBasic.component";
import { addDays, addWeeks, subDays, subWeeks, toUTCString } from "../../utils";

export default {
  title: "DateRangePicker/Basic",
  component: DateRangePicker,
  argTypes: {
    minValue: { control: "date" },
    maxValue: { control: "date" },
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }),
  },
} as Meta;

export const Default: Story = args => {
  return <DateRangePicker {...args} />;
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  defaultValue: {
    start: toUTCString(new Date()),
    end: toUTCString(addWeeks(new Date(), 1)),
  },
};

export const MinMaxValue = Default.bind({});
MinMaxValue.args = {
  defaultValue: {
    start: toUTCString(new Date()),
    end: toUTCString(addWeeks(new Date(), 1)),
  },
  minValue: toUTCString(subWeeks(new Date(), 1)),
  maxValue: toUTCString(addWeeks(new Date(), 2)),
};

export const Disabled = Default.bind({});
Disabled.args = {
  defaultValue: {
    start: toUTCString(new Date()),
    end: toUTCString(addWeeks(new Date(), 1)),
  },
  isDisabled: true,
};

export const Readonly = Default.bind({});
Readonly.args = {
  defaultValue: {
    start: toUTCString(new Date()),
    end: toUTCString(addWeeks(new Date(), 1)),
  },
  isReadOnly: true,
};

export const Autofocus = Default.bind({});
Autofocus.args = {
  defaultValue: {
    start: toUTCString(new Date()),
    end: toUTCString(addWeeks(new Date(), 1)),
  },
  autoFocus: true,
};

export const ControlledInput = () => {
  const [start, setStart] = React.useState(toUTCString(subDays(new Date(), 1)));
  const [end, setEnd] = React.useState(toUTCString(addDays(new Date(), 1)));

  return (
    <div>
      <input
        type="date"
        onChange={e => setStart(e.target.value)}
        value={start}
      />
      <input type="date" onChange={e => setEnd(e.target.value)} value={end} />
      <DateRangePicker
        value={{ start, end }}
        onChange={({ end, start }) => {
          setStart(start);
          setEnd(end);
        }}
      />
    </div>
  );
};
