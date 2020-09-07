import React from "react";
import { Meta } from "@storybook/react";

import { UseNumberInputProps, useNumberInputState } from "../NumberInputState";
import { NumberInput } from "../NumberInput";
import { NumberInputDecrementButton } from "../NumberInputDecrementButton";
import { NumberInputIncrementButton } from "../NumberInputIncrementButton";

const NumberInputComp = (props: UseNumberInputProps) => {
  const state = useNumberInputState(props);
  console.log("%c state", "color: #5200cc", state);

  return (
    <div>
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInput {...state} />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </div>
  );
};

export default {
  title: "Component/NumberInput",
  component: NumberInput,
} as Meta;

export const Default = () => {
  const props = {};

  return <NumberInputComp {...props} />;
};

// TODO: Also handle mouse wheel disabling for disabled input
export const DefaultValue = () => {
  const props = {
    defaultValue: 15,
    min: 10,
    max: 20,
  };

  return <NumberInputComp {...props} />;
};
