import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

import {
  datePickerRangeTemplate,
  datePickerRangeTemplateJs,
  datePickerRangeCssTemplate,
  utilsTemplateJs,
  utilsTemplate,
} from "./templates";
import "./DatePickerRange.css";
import { App as DateRangePicker } from "./DatePickerRange.component";
import { createPreviewTabs } from "../../../.storybook/utils";
import {
  addDays,
  addWeeks,
  format,
  subDays,
  subWeeks,
} from "../../utils/index";

export default {
  title: "DatePicker/Range",
  component: DateRangePicker,
  argTypes: {
    defaultStart: {
      control: "date",
      name: "default.start",
    },
    defaultEnd: {
      control: "date",
      name: "default.end",
    },
    start: { control: "date", name: "value.start" },
    end: { control: "date", name: "value.end" },
    minValue: { control: "date" },
    maxValue: { control: "date" },
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: datePickerRangeTemplateJs,
      ts: datePickerRangeTemplate,
      css: datePickerRangeCssTemplate,
      jsUtils: utilsTemplateJs,
      tsUtils: utilsTemplate,
    }),
  },
} as Meta;

const Base: Story = args => {
  args.value = {
    start: args.start && format(new Date(args.start), "YYYY-MM-DD"),
    end: args.end && format(new Date(args.end), "YYYY-MM-DD"),
  };
  args.defaultValue = {
    start:
      args.defaultStart && format(new Date(args.defaultStart), "YYYY-MM-DD"),
    end: args.defaultEnd && format(new Date(args.defaultEnd), "YYYY-MM-DD"),
  };
  args.minValue &&= format(new Date(args.minValue), "YYYY-MM-DD");
  args.maxValue &&= format(new Date(args.maxValue), "YYYY-MM-DD");

  const [argProps, updateArgs] = useArgs();

  return (
    <DateRangePicker
      value={{ start: argProps["start"], end: argProps["nd"] }}
      onChange={date => {
        updateArgs({
          start: format(new Date(date.start), "YYYY-MM-DD"),
          end: format(new Date(date.end), "YYYY-MM-DD"),
        });
      }}
      {...args}
    />
  );
};

export const Default = Base.bind({});

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  defaultStart: new Date(),
  defaultEnd: addWeeks(new Date(), 1),
};

export const MinMaxValue = Base.bind({});
MinMaxValue.args = {
  defaultStart: new Date(),
  defaultEnd: addWeeks(new Date(), 1),
  minValue: subWeeks(new Date(), 1),
  maxValue: addWeeks(new Date(), 2),
};

export const Disabled = Base.bind({});
Disabled.args = {
  defaultStart: new Date(),
  defaultEnd: addWeeks(new Date(), 1),
  isDisabled: true,
};

export const Readonly = Base.bind({});
Readonly.args = {
  defaultStart: new Date(),
  defaultEnd: addWeeks(new Date(), 1),
  isReadonly: true,
};

export const Autofocus = Base.bind({});
Autofocus.args = {
  defaultStart: new Date(),
  defaultEnd: addWeeks(new Date(), 1),
  autoFocus: true,
};

export const ControlledStory = Base.bind({});
ControlledStory.args = {
  start: new Date(),
  end: addWeeks(new Date(), 1),
};

export const ControlledInput = () => {
  const [start, setStart] = React.useState(
    format(subDays(new Date(), 1), "YYYY-MM-DD"),
  );
  const [end, setEnd] = React.useState(
    format(addDays(new Date(), 1), "YYYY-MM-DD"),
  );

  return (
    <div>
      <input
        type="date"
        onChange={e => setStart(e.target.value)}
        value={start}
      />
      <input type="date" onChange={e => setEnd(e.target.value)} value={end} />
      <DateRangePicker
        value={{ start, end }}
        onChange={({ end, start }) => {
          setStart(start);
          setEnd(end);
        }}
      />
    </div>
  );
};
