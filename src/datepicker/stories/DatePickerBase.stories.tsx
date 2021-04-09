import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { addWeeks, subWeeks, format, addDays } from "date-fns";

import {
  datePickerBaseTemplate,
  datePickerBaseTemplateJs,
  datePickerBaseCssTemplate,
  utilsTemplate,
  utilsTemplateJs,
} from "./templates";
import "./DatePickerBase.css";
import { App as DatePicker } from "./DatePickerBase.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: DatePicker,
  title: "DatePicker/Base",
  argTypes: {
    defaultValue: { control: "date" },
    value: { control: "date" },
    minValue: { control: "date" },
    maxValue: { control: "date" },
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: datePickerBaseTemplateJs,
      ts: datePickerBaseTemplate,
      css: datePickerBaseCssTemplate,
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
    <DatePicker
      value={value}
      onChange={date =>
        updateArgs({ value: format(new Date(date), "yyyy-MM-dd") })
      }
      {...args}
    />
  );
};

export const Default = Base.bind({});

export const DefaultDate = Base.bind({});
DefaultDate.args = {
  defaultValue: addDays(new Date(), 2),
};

export const MinMaxDate = Base.bind({});
MinMaxDate.args = {
  defaultValue: addDays(new Date(), 2),
  minValue: new Date(),
  maxValue: addWeeks(new Date(), 2),
};

export const InValidDate = Base.bind({});
InValidDate.args = {
  defaultValue: addWeeks(new Date(), 2),
  minValue: subWeeks(new Date(), 1),
  maxValue: addWeeks(new Date(), 1),
};

export const Disabled = Base.bind({});
Disabled.args = { defaultValue: new Date(), isDisabled: true };

export const Readonly = Base.bind({});
Readonly.args = { defaultValue: new Date(), isReadonly: true };

export const AutoFocus = Base.bind({});
AutoFocus.args = { defaultValue: new Date(), autoFocus: true };

export const FormatOptions = Base.bind({});
FormatOptions.args = {
  defaultValue: new Date(),
  formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
};

export const ControlledStory = Base.bind({});
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
