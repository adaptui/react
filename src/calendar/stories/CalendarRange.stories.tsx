import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

import "./CalendarRange.css";
import {
  calendarRangeTemplate,
  calendarRangeTemplateJs,
  calendarRangeCssTemplate,
  utilsTemplateJs,
  utilsTemplate,
} from "./templates";
import { App as RangeCalendar } from "./CalendarRange.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import {
  addDays,
  addWeeks,
  format,
  subDays,
  subWeeks,
} from "@renderlesskit/react/utils";

export default {
  title: "Calendar/Range",
  component: RangeCalendar,
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
      js: calendarRangeTemplateJs,
      ts: calendarRangeTemplate,
      css: calendarRangeCssTemplate,
      jsUtils: utilsTemplateJs,
      tsUtils: utilsTemplate,
    }),
  },
} as Meta;

const Base: Story = args => {
  args.value = {
    start: args.start && format(new Date(args.start), "yyyy-MM-dd"),
    end: args.end && format(new Date(args.end), "yyyy-MM-dd"),
  };
  args.defaultValue = {
    start:
      args.defaultStart && format(new Date(args.defaultStart), "yyyy-MM-dd"),
    end: args.defaultEnd && format(new Date(args.defaultEnd), "yyyy-MM-dd"),
  };
  args.minValue &&= format(new Date(args.minValue), "yyyy-MM-dd");
  args.maxValue &&= format(new Date(args.maxValue), "yyyy-MM-dd");

  const [argProps, updateArgs] = useArgs();

  return (
    <RangeCalendar
      value={{ start: argProps["start"], end: argProps["nd"] }}
      onChange={date => {
        updateArgs({
          start: format(new Date(date.start), "yyyy-MM-dd"),
          end: format(new Date(date.end), "yyyy-MM-dd"),
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

export const MinMaxDate = Base.bind({});
MinMaxDate.args = {
  minValue: subWeeks(new Date(), 1),
  maxValue: addWeeks(new Date(), 1),
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
    format(subDays(new Date(), 1), "yyyy-MM-dd"),
  );
  const [end, setEnd] = React.useState(
    format(addDays(new Date(), 1), "yyyy-MM-dd"),
  );

  return (
    <div>
      <input
        type="date"
        onChange={e => setStart(e.target.value)}
        value={start}
      />
      <input type="date" onChange={e => setEnd(e.target.value)} value={end} />
      <RangeCalendar
        value={{ start, end }}
        onChange={({ end, start }) => {
          setStart(start);
          setEnd(end);
        }}
      />
    </div>
  );
};
