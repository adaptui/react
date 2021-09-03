import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

import "./DatePickerBasic.css";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import js from "./templates/DatePickerBasicJsx";
import ts from "./templates/DatePickerBasicTsx";
import css from "./templates/DatePickerBasicCss";
import DatePicker from "./DatePickerBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";
import { addDays, addWeeks, format, subWeeks } from "../../utils/index";

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
  args.value &&= format(new Date(args.value), "YYYY-MM-DD");
  args.defaultValue &&= format(new Date(args.defaultValue), "YYYY-MM-DD");
  args.minValue &&= format(new Date(args.minValue), "YYYY-MM-DD");
  args.maxValue &&= format(new Date(args.maxValue), "YYYY-MM-DD");

  const [{ value }, updateArgs] = useArgs();

  return (
    <DatePicker
      value={value}
      onChange={date =>
        updateArgs({ value: format(new Date(date), "YYYY-MM-DD") })
      }
      {...args}
    />
  );
};

export const DefaultDate = Default.bind({});
DefaultDate.args = {
  defaultValue: addDays(new Date(), 2),
};

export const MinMaxDate = Default.bind({});
MinMaxDate.args = {
  defaultValue: addDays(new Date(), 2),
  minValue: new Date(),
  maxValue: addWeeks(new Date(), 2),
};

export const InValidDate = Default.bind({});
InValidDate.args = {
  defaultValue: addWeeks(new Date(), 2),
  minValue: subWeeks(new Date(), 1),
  maxValue: addWeeks(new Date(), 1),
};

export const Disabled = Default.bind({});
Disabled.args = { defaultValue: new Date(), isDisabled: true };

export const Readonly = Default.bind({});
Readonly.args = { defaultValue: new Date(), isReadonly: true };

export const AutoFocus = Default.bind({});
AutoFocus.args = { defaultValue: new Date(), autoFocus: true };

export const FormatOptions = Default.bind({});
FormatOptions.args = {
  defaultValue: new Date(),
  formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
};

export const ControlledStory = Default.bind({});
ControlledStory.args = {
  value: addDays(new Date(), 2),
  minValue: new Date(),
  maxValue: addWeeks(new Date(), 2),
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
