import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { addWeeks, format, subWeeks } from "date-fns";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import "./Calendar.css";
import { appTemplate, appTemplateJs } from "./templates";
import { App as Calendar } from "./Calendar.component";

export default {
  component: Calendar,
  title: "Calendar",
  argTypes: {
    value: { control: "date" },
    minValue: { control: "date" },
    maxValue: { control: "date" },
    defaultValue: { control: "date", defaultValue: new Date() },
  },
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: appTemplateJs,
        language: "jsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
      {
        tab: "React",
        template: appTemplate,
        language: "tsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
    ],
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
DefaultValue.args = { value: "2001-01-01", defaultValue: "2001-01-01" };

export const MinMaxDate = Base.bind({});
MinMaxDate.args = {
  defaultValue: new Date(2020, 10, 1),
  minValue: new Date(),
  maxValue: addWeeks(new Date(), 1),
};

export const MinMaxDefaultDate = Base.bind({});
MinMaxDefaultDate.args = {
  defaultValue: new Date(2020, 10, 7),
  minValue: subWeeks(new Date(2020, 10, 7), 1),
  maxValue: addWeeks(new Date(2020, 10, 7), 1),
};

export const IsDisabled = Base.bind({});
IsDisabled.args = {
  value: new Date(),
  isDisabled: true,
};

export const IsReadonly = Base.bind({});
IsReadonly.args = {
  value: new Date(),
  isReadonly: true,
};

export const AutoFocus = Base.bind({});
AutoFocus.args = {
  value: new Date(),
  autoFocus: true,
};

export const WithNativeDateInput = () => {
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
