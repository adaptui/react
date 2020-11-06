import "./Select.css";
import React from "react";
import { Meta } from "@storybook/react";
import { CompositeInitialState, PopoverInitialState } from "reakit";

import { App as Select } from "./Select.component";
import {
  selectTemplate,
  selectTemplateJs,
  selectCssTemplate,
} from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import {
  SelectMenu,
  SelectOption,
  SelectTrigger,
  useSelectState,
  SelectInitialState,
  Select as SelectComponent,
} from "..";

export const Default: React.FC<Omit<
  SelectInitialState,
  keyof (PopoverInitialState & CompositeInitialState)
>> = props => <Select {...props} />;

export default {
  component: Default,
  title: "Select/Basic",
  parameters: {
    preview: createPreviewTabs({
      js: selectTemplateJs,
      ts: selectTemplate,
      css: selectCssTemplate,
    }),
  },
} as Meta;

const countries = [
  { name: "australia", emoji: "🇦🇺" },
  { name: "russia", emoji: "🇷🇺" },
  { name: "new zealand", emoji: "🇳🇿" },
  { name: "india", emoji: "🇮🇳" },
  { name: "niger", emoji: "🇳🇪" },
  { name: "canada", emoji: "🇨🇦" },
  { name: "indonesia", emoji: "🇮🇩" },
  { name: "portugal", emoji: "🇵🇹" },
  { name: "norway", emoji: "🇳🇴" },
  { name: "switzerland", emoji: "🇨🇭" },
  { name: "africa", emoji: "🇨🇫" },
  { name: "colombia", emoji: "🇨🇴" },
  { name: "costa rica", emoji: "🇨🇷" },
  { name: "zimbabwe", emoji: "🇿🇼" },
];

export const MultiSelect = Default.bind({});
MultiSelect.args = { allowMultiselect: true };

export const DefaultSelected = Default.bind({});
DefaultSelected.args = { selected: "india" };

export const Scrolling: React.FC = () => {
  return (
    <div style={{ margin: "800px 0" }}>
      <Select />
    </div>
  );
};

export const MultiSelectCheckboxes: React.FC = () => {
  const state = useSelectState({ allowMultiselect: true });

  return (
    <SelectComponent
      className="select"
      {...state}
      onChange={(value: any) => console.log(value)}
    >
      <SelectTrigger className="select__header" {...state}>
        <b style={{ color: state.isPlaceholder ? "gray" : "black" }}>
          {state.isPlaceholder
            ? "Select one.."
            : `(${state.selected.length}) Items Selected`}
        </b>
      </SelectTrigger>

      <SelectMenu
        className="select__dropdown"
        {...state}
        style={{ maxHeight: 200, overflowY: "scroll" }}
      >
        {countries.map(item => {
          return (
            <SelectOption
              className="select__dropdown--item"
              {...state}
              key={item.name}
              value={item.name}
            >
              <label>
                <input
                  type="checkbox"
                  checked={!!state.selected.includes(item.name)}
                />{" "}
                <span>{item.name}</span>
              </label>
            </SelectOption>
          );
        })}
      </SelectMenu>
    </SelectComponent>
  );
};
