import React from "react";
import { Meta } from "@storybook/react";

import {
  Picker,
  PickerButton,
  PickerListBox,
  PickerItem,
  usePickerState,
} from "../index";

export default {
  title: "Component/Picker",
  component: Picker,
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
    <Picker {...state}>
      <PickerButton {...state}>Select One Value</PickerButton>

      <PickerListBox {...state}>
        {countries.map(item => {
          return (
            <PickerItem {...state} key={item.name} value={item.name}>
              {item.name}
            </PickerItem>
          );
        })}
      </PickerListBox>
    </Picker>
  );
};

export const Default: React.FC = () => {
  const state = usePickerState();
  console.log("%c state", "color: #917399", state);

  return <Select state={state} />;
};
