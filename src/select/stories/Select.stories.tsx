import React from "react";
import { Meta } from "@storybook/react";

import {
  Select,
  SelectOption,
  SelectTrigger,
  SelectMenu,
  useSelectState,
} from "../";
import "./style.css";

export default {
  title: "Select",
} as Meta;

const countries = [
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

const SelectPicker: React.FC<{ state: any }> = ({ state }) => {
  return (
    <Select {...state} onChange={(value: any) => console.log(value)}>
      <SelectTrigger {...state}>
        <b style={{ color: state.isPlaceholder ? "gray" : "black" }}>
          {state.isPlaceholder ? "Select one.." : state.selected.join(",")}
        </b>
      </SelectTrigger>

      <SelectMenu {...state} style={{ maxHeight: 200, overflowY: "scroll" }}>
        {countries.map(item => {
          return (
            <SelectOption {...state} key={item.name} value={item.name}>
              {item.name}
            </SelectOption>
          );
        })}
      </SelectMenu>
    </Select>
  );
};

export const Default: React.FC = () => {
  const state = useSelectState({});

  return <SelectPicker state={state} />;
};

export const MultiSelect: React.FC = () => {
  const state = useSelectState({ allowMultiselect: true });

  return <SelectPicker state={state} />;
};

export const MultiSelectCheckboxes: React.FC = () => {
  const state = useSelectState({ allowMultiselect: true });

  return (
    <Select {...state} onChange={(value: any) => console.log(value)}>
      <SelectTrigger {...state}>
        <b style={{ color: state.isPlaceholder ? "gray" : "black" }}>
          {state.isPlaceholder
            ? "Select one.."
            : `(${state.selected.length}) Items Selected`}
        </b>
      </SelectTrigger>

      <SelectMenu {...state} style={{ maxHeight: 200, overflowY: "scroll" }}>
        {countries.map(item => {
          return (
            <SelectOption {...state} key={item.name} value={item.name}>
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
    </Select>
  );
};

export const DefaultSelected: React.FC = () => {
  const state = useSelectState({ selected: "india" });

  return <SelectPicker state={state} />;
};

export const Scrolling: React.FC = () => {
  const state = useSelectState({ selected: "india" });

  return (
    <div style={{ margin: "800px 0" }}>
      <SelectPicker state={state} />
    </div>
  );
};
