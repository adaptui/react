import "./TimePicker.css";
import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as TimePicker } from "./TimePicker.component";
import { appTemplate, appTemplateJs, cssTemplate } from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: TimePicker,
  title: "TimePicker",
  parameters: {
    preview: createPreviewTabs({
      ts: appTemplate,
      js: appTemplateJs,
      css: cssTemplate,
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
