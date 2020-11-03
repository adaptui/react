import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { addWeeks, subWeeks, format, addDays } from "date-fns";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import "./DatePicker.css";
import { App as DatePicker } from "./DatePicker.component";
import { appTemplate, appTemplateJs, cssTemplate } from "./templates";

export default {
  component: DatePicker,
  title: "DatePicker",
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
      {
        tab: "CSS",
        template: cssTemplate,
        language: "css",
        copy: true,
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

export const InitialDate = Base.bind({});
InitialDate.args = {
  value: "2020-02-29",
  defaultDate: "2020-02-29",
};

export const MinMaxDate = Base.bind({});
MinMaxDate.args = {
  value: addDays(new Date(), 2),
  minValue: new Date(),
  maxValue: addWeeks(new Date(), 2),
};

export const InValidDate = Base.bind({});
InValidDate.args = {
  value: addWeeks(new Date(), 2),
  minValue: subWeeks(new Date(), 1),
  maxValue: addWeeks(new Date(), 1),
};

export const Options = Base.bind({});
Options.args = {
  defaultValue: addWeeks(new Date(), 2),
  value: addWeeks(new Date(), 2),
  minValue: null,
  maxValue: null,
  autoFocus: false,
  isDisabled: false,
  isReadOnly: false,
  formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
};

export const ControllableState = () => {
  const [value, setValue] = React.useState("2020-10-13");

  return (
    <div>
      <input
        type="date"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <DatePicker value={value} onChange={setValue} />
    </div>
  );
};
