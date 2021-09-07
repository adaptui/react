import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./DatePickerBasic.css";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import js from "./templates/DatePickerBasicJsx";
import ts from "./templates/DatePickerBasicTsx";
import css from "./templates/DatePickerBasicCss";
import DatePicker from "./DatePickerBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";
import { addDays, addWeeks, subWeeks, toUTCString } from "../../utils/index";

export default {
  component: DatePicker,
  title: "DatePicker/Basic",
  argTypes: {
    defaultValue: { control: "date" },
    value: { control: "date" },
    minValue: { control: "date" },
    maxValue: { control: "date" },
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }),
  },
} as Meta;

export const Default: Story = args => {
  return <DatePicker {...args} />;
};

export const DefaultDate = Default.bind({});
DefaultDate.args = {
  defaultValue: toUTCString(addDays(new Date(), 2)),
};

export const MinMaxDate = Default.bind({});
MinMaxDate.args = {
  defaultValue: toUTCString(addDays(new Date(), 2)),
  minValue: toUTCString(new Date()),
  maxValue: toUTCString(addWeeks(new Date(), 2)),
};

export const InValidDate = Default.bind({});
InValidDate.args = {
  defaultValue: toUTCString(addWeeks(new Date(), 2)),
  minValue: toUTCString(subWeeks(new Date(), 1)),
  maxValue: toUTCString(addWeeks(new Date(), 1)),
};

export const Disabled = Default.bind({});
Disabled.args = { defaultValue: toUTCString(new Date()), isDisabled: true };

export const Readonly = Default.bind({});
Readonly.args = { defaultValue: toUTCString(new Date()), isReadOnly: true };

export const AutoFocus = Default.bind({});
AutoFocus.args = { defaultValue: toUTCString(new Date()), autoFocus: true };

export const FormatOptions = Default.bind({});
FormatOptions.args = {
  defaultValue: toUTCString(new Date()),
  formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
};

export const ControllableInput = () => {
  const [value, setValue] = React.useState("2020-10-13");

  return (
    <div>
      <input
        type="date"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <br />
      <br />
      <DatePicker value={value} onChange={setValue} />
    </div>
  );
};
