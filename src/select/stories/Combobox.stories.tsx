import React from "react";
import { Meta, Story } from "@storybook/react";

import {
  selectCssTemplate,
  comboboxTemplate,
  comboboxTemplateJs,
} from "./templates";
import { App as Combobox } from "./Combobox.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import {
  Select,
  SelectMenu,
  SelectInput,
  SelectOption,
  useSelectState,
} from "..";

export default {
  component: Combobox,
  title: "Select/Combobox",
  parameters: {
    preview: createPreviewTabs({
      js: comboboxTemplateJs,
      ts: comboboxTemplate,
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

const Base: Story = args => <Combobox {...args} />;

export const Default = Base.bind({});

export const WithoutFilter: React.FC = () => {
  const state = useSelectState({
    allowMultiselect: true,
    selected: "india",
    isCombobox: true,
  });

  return (
    <Select
      {...state}
      className="select"
      onChange={(value: any) => console.log(value)}
    >
      <div className="select__header">
        {state.selected.map(item => (
          <span className="select__chip">
            <span> {item}</span>
            <button
              onClick={e => {
                e.stopPropagation();
                state.removeSelected(item);
              }}
            >
              x
            </button>
          </span>
        ))}
        <SelectInput
          className="select__input"
          placeholder={state.isPlaceholder ? "Select.." : ""}
          {...state}
        ></SelectInput>
      </div>

      <SelectMenu className="select__dropdown" {...state}>
        {countries.map(item => {
          return (
            <SelectOption
              className="select__dropdown--item"
              {...state}
              key={item.name}
              value={item.name}
            >
              {item.name}
            </SelectOption>
          );
        })}
      </SelectMenu>
    </Select>
  );
};
