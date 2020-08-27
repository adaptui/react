import React from "react";
import { Meta } from "@storybook/react";
import { css } from "emotion";

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

const focus = css`
  &:focus {
    outline: none;
    box-shadow: rgba(66, 153, 225, 0.6) 0px 0px 0px 3px;
  }
`;

const Select: React.FC<{ state: any }> = ({ state }) => {
  const { selectedValue } = state;
  return (
    <Picker className={focus} {...state}>
      <PickerButton className={focus} {...state}>{`${
        selectedValue ? selectedValue : "Select One Value"
      }`}</PickerButton>

      <PickerListBox className={focus} {...state}>
        {countries.map(item => {
          return (
            <PickerItem
              className={focus}
              {...state}
              key={item.name}
              value={item.name}
            >
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

export const DefaultValueSelected: React.FC = () => {
  const state = usePickerState({ selectedValue: "india" });
  console.log("%c state", "color: #917399", state);

  return <Select state={state} />;
};

export const Scrolling: React.FC = () => {
  const state = usePickerState({ selectedValue: "australia" });

  return (
    <div style={{ margin: "800px 0" }}>
      <Select state={state} />
    </div>
  );
};
