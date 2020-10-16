import React from "react";
import { Meta } from "@storybook/react";

import {
  Select,
  SelectOption,
  SelectInput,
  SelectMenu,
  useSelectState,
} from "../";
import "./style.css";

export default {
  title: "Select-Combobox",
} as Meta;

interface Country {
  name: string;
}

const countries: Country[] = [
  { name: "australia" },
  { name: "russia" },
  { name: "new zealand" },
  { name: "india" },
  { name: "california" },
  { name: "ireland" },
  { name: "indonesia" },
  { name: "chennai" },
  { name: "mexico" },
  { name: "sydney" },
  { name: "africa" },
  { name: "las vagas" },
  { name: "vietnam" },
  { name: "zimbabwe" },
];

export const Default: React.FC = () => {
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
            item.name.match(state.inputValue) &&
            !state.selected.includes(item.name) && (
              <SelectOption
                className="select__dropdown--item"
                {...state}
                key={item.name}
                value={item.name}
              >
                {item.name}
              </SelectOption>
            )
          );
        })}
      </SelectMenu>
    </Select>
  );
};

export const WithoutFilter: React.FC = () => {
  const state = useSelectState({
    allowMultiselect: true,
    selected: "india",
    isCombobox: true,
  });

  return (
    <Select
      className="select"
      {...state}
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
