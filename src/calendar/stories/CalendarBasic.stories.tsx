import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import { addMonths, addYears, subMonths, toUTCString } from "../../utils";

import css from "./templates/CalendarBasicCss";
import js from "./templates/CalendarBasicJsx";
import ts from "./templates/CalendarBasicTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import Calendar from "./CalendarBasic.component";

import "./CalendarBasic.css";

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
  return <Calendar {...args} />;
};

export const DefaultDate = Default.bind({});
DefaultDate.args = { defaultValue: toUTCString(addYears(new Date(), 1)) };

export const MinMaxDate = Default.bind({});
MinMaxDate.args = {
  minValue: toUTCString(subMonths(new Date(), 1)),
  maxValue: toUTCString(addMonths(new Date(), 1)),
};

export const IsDisabled = Default.bind({});
IsDisabled.args = { defaultValue: toUTCString(new Date()), isDisabled: true };

export const IsReadonly = Default.bind({});
IsReadonly.args = { defaultValue: toUTCString(new Date()), isReadOnly: true };

export const AutoFocus = Default.bind({});
AutoFocus.args = { defaultValue: toUTCString(new Date()), autoFocus: true };

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
