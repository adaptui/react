import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./TimePickerBasic.css";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import js from "./templates/TimePickerBasicJsx";
import ts from "./templates/TimePickerBasicTsx";
import css from "./templates/TimePickerBasicCss";
import { App as TimePicker } from "./TimePickerBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: TimePicker,
  title: "TimePicker/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }),
  },
} as Meta;

export const Default: Story = args => <TimePicker {...args} />;

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  defaultValue: "01:30",
};

export const ControllableState = () => {
  const [value, setValue] = React.useState("12:30:20");

  return (
    <div>
      <input
        type="time"
        onChange={e => setValue(e.target.value)}
        step="1"
        value={value}
      />
      <br />
      <br />
      <Default
        value={value}
        onChange={setValue}
        formatOptions={{ timeStyle: "medium" }}
      />
    </div>
  );
};

export const Disabled = Default.bind({});
Disabled.args = {
  isDisabled: true,
};

export const ReadOnly = Default.bind({});
ReadOnly.args = {
  isReadOnly: true,
};

export const AutoFocus = Default.bind({});
AutoFocus.args = {
  autoFocus: true,
};
