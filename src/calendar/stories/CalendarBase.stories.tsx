import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

import "./CalendarBase.css";
import {
  calendarBaseTemplate,
  calendarBaseTemplateJs,
  calendarBaseCssTemplate,
  utilsTemplateJs,
  utilsTemplate,
} from "./templates";
import { App as Calendar } from "./CalendarBase.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import { format } from "util";
import { addWeeks } from "@renderlesskit/react/utils";

export default {
  component: Calendar,
  title: "Calendar/Base",
  argTypes: {
    defaultValue: { control: "date" },
    value: { control: "date" },
    minValue: { control: "date" },
    maxValue: { control: "date" },
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: calendarBaseTemplateJs,
      ts: calendarBaseTemplate,
      css: calendarBaseCssTemplate,
      jsUtils: utilsTemplateJs,
      tsUtils: utilsTemplate,
    }),
  },
} as Meta;

const Base: Story = args => {
  args.value &&= format(new Date(args.value), "yyyy-MM-dd");
  args.defaultValue &&= format(new Date(args.defaultValue), "yyyy-MM-dd");
  args.minValue &&= format(new Date(args.minValue), "yyyy-MM-dd");
  args.maxValue &&= format(new Date(args.maxValue), "yyyy-MM-dd");

  const [{ value }, updateArgs] = useArgs();

  return (
    <Calendar
      value={value}
      onChange={date =>
        updateArgs({ value: format(new Date(date), "yyyy-MM-dd") })
      }
      {...args}
    />
  );
};

export const Default = Base.bind({});

export const DefaultValue = Base.bind({});
DefaultValue.args = { defaultValue: new Date() };

export const MinMaxDate = Base.bind({});
MinMaxDate.args = {
  minValue: new Date(),
  maxValue: addWeeks(new Date(), 1),
};

export const IsDisabled = Base.bind({});
IsDisabled.args = { defaultValue: new Date(), isDisabled: true };

export const IsReadonly = Base.bind({});
IsReadonly.args = { defaultValue: new Date(), isReadonly: true };

export const AutoFocus = Base.bind({});
AutoFocus.args = { defaultValue: new Date(), autoFocus: true };

export const ControlledStory = Base.bind({});
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
