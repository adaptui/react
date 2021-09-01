import "./TimePicker.css";
import * as React from "react";
import { Meta, Story } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  timePickerTemplate,
  timePickerTemplateJs,
  timePickerCssTemplate,
} from "./templates";
import { App as TimePicker } from "./TimePicker.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: TimePicker,
  title: "TimePicker",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      ts: timePickerTemplate,
      js: timePickerTemplateJs,
      jsUtils: utilsTemplateJs,
      tsUtils: utilsTemplate,
      css: timePickerCssTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <TimePicker {...args} />;

export const Default = Base.bind({});

export const DefaultValue = Base.bind({});
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
      <Base
        value={value}
        onChange={setValue}
        formatOptions={{ timeStyle: "medium" }}
      />
    </div>
  );
};

export const Disabled = Base.bind({});
Disabled.args = {
  isDisabled: true,
};

export const ReadOnly = Base.bind({});
ReadOnly.args = {
  isReadOnly: true,
};

export const AutoFocus = Base.bind({});
AutoFocus.args = {
  autoFocus: true,
};
