import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

import "./CalendarBasic.css";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import js from "./templates/CalendarBasicJsx";
import ts from "./templates/CalendarBasicTsx";
import css from "./templates/CalendarBasicCss";
import { format, addWeeks } from "../../utils";
import Calendar from "./CalendarBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Calendar,
  title: "Calendar/Basic",
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
    <Calendar
      value={value}
      onChange={date =>
        updateArgs({ value: format(new Date(date), "YYYY-MM-DD") })
      }
      {...args}
    />
  );
};

export const DefaultValue = Default.bind({});
DefaultValue.args = { defaultValue: new Date() };

export const MinMaxDate = Default.bind({});
MinMaxDate.args = {
  minValue: new Date(),
  maxValue: addWeeks(new Date(), 1),
};

export const IsDisabled = Default.bind({});
IsDisabled.args = { defaultValue: new Date(), isDisabled: true };

export const IsReadonly = Default.bind({});
IsReadonly.args = { defaultValue: new Date(), isReadonly: true };

export const AutoFocus = Default.bind({});
AutoFocus.args = { defaultValue: new Date(), autoFocus: true };

export const ControlledStory = Default.bind({});
ControlledStory.args = {
  value: new Date(),
  minValue: new Date(),
  maxValue: addWeeks(new Date(), 1),
};

export const ControlledInput = () => {
  const [value, setValue] = React.useState("2020-10-13");

  return (
    <div>
      <input
        type="date"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <Calendar value={value} onChange={setValue} />
    </div>
  );
};
