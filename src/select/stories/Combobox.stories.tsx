import React from "react";
import { Meta } from "@storybook/react";

import {
  SelectMenu,
  SelectItem,
  SelectInput,
  SelectDropdown,
  useSelectState,
} from "../";
import "./style.css";

export default {
  title: "Component/Select-Combobox",
} as Meta;

interface Country {
  name: string;
}
export const Default: React.FC = () => {
  const [countries, setCountries] = React.useState<Country[]>([
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
  ]);

  const state = useSelectState({
    allowMultiselect: true,
    selected: "india",
  });

  return (
    <SelectMenu
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

      <SelectDropdown className="select__dropdown" maxHeight={200} {...state}>
        {countries.map(item => {
          return (
            item.name.match(state.inputValue) &&
            !state.selected.includes(item.name) && (
              <SelectItem
                className="select__dropdown--item"
                {...state}
                key={item.name}
                value={item.name}
              >
                {item.name}
              </SelectItem>
            )
          );
        })}
      </SelectDropdown>
    </SelectMenu>
  );
};
