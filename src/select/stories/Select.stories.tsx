import React from "react";
import { Meta } from "@storybook/react";

import {
  SelectMenu,
  SelectItem,
  SelectTrigger,
  SelectDropdown,
  useSelectState,
} from "../";
import "./style.css";

export default {
  title: "Component/Select",
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

const Select: React.FC<{ state: any }> = ({ state }) => {
  return (
    <SelectMenu {...state} onChange={(value: any) => console.log(value)}>
      <SelectTrigger {...state}>
        <b style={{ color: state.isPlaceholder ? "gray" : "black" }}>
          {state.isPlaceholder ? "Select one.." : state.selected.join(",")}
        </b>
      </SelectTrigger>

      <SelectDropdown style={{ width: "auto" }} maxHeight={200} {...state}>
        {countries.map(item => {
          return (
            <SelectItem {...state} key={item.name} value={item.name}>
              {item.name}
            </SelectItem>
          );
        })}
      </SelectDropdown>
    </SelectMenu>
  );
};

export const Default: React.FC = () => {
  const state = useSelectState({});

  return <Select state={state} />;
};

export const MultiSelect: React.FC = () => {
  const state = useSelectState({ allowMultiselect: true });

  return <Select state={state} />;
};

export const MultiSelectCheckboxes: React.FC = () => {
  const state = useSelectState({ allowMultiselect: true });

  return (
    <SelectMenu {...state} onChange={(value: any) => console.log(value)}>
      <SelectTrigger {...state}>
        <b style={{ color: state.isPlaceholder ? "gray" : "black" }}>
          {state.isPlaceholder
            ? "Select one.."
            : `(${state.selected.length}) Items Selected`}
        </b>
      </SelectTrigger>

      <SelectDropdown maxHeight={200} {...state}>
        {countries.map(item => {
          return (
            <SelectItem {...state} key={item.name} value={item.name}>
              <label>
                <input
                  type="checkbox"
                  checked={!!state.selected.includes(item.name)}
                />{" "}
                <span>{item.name}</span>
              </label>
            </SelectItem>
          );
        })}
      </SelectDropdown>
    </SelectMenu>
  );
};

export const DefaultSelected: React.FC = () => {
  const state = useSelectState({ selected: "india" });

  return <Select state={state} />;
};

export const Scrolling: React.FC = () => {
  const state = useSelectState({ selected: "india" });

  return (
    <div style={{ margin: "800px 0" }}>
      <Select state={state} />
    </div>
  );
};
