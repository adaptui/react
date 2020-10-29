import React from "react";
import { Meta, Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { useForm, Controller } from "react-hook-form";

import { NumberInput } from "../NumberInput";
import { NumberInputDecrementButton } from "../NumberInputDecrementButton";
import { NumberInputIncrementButton } from "../NumberInputIncrementButton";
import { NumberInputState, useNumberInputState } from "../NumberInputState";

const NumberInputComp = (props: NumberInputState) => {
  const state = useNumberInputState(props);

  return (
    <div>
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInput {...state} />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </div>
  );
};

export default {
  title: "NumberInput",
  component: NumberInput,
  argTypes: {
    value: { control: "number" },
    min: { control: "number" },
    step: { control: "number" },
    max: { control: "number" },
    precision: { control: "number" },
    defaultValue: { control: "number" },
    isDisabled: { control: "boolean" },
    isReadOnly: { control: "boolean" },
    keepWithinRange: { control: "boolean" },
    clampValueOnBlur: { control: "boolean" },
    focusInputOnChange: { control: "boolean" },
  },
} as Meta;

const Base: Story = args => {
  const [{ value, defaultValue }, updateArgs] = useArgs();

  return (
    <NumberInputComp
      onChange={value => {
        updateArgs({ value });
      }}
      defaultValue={defaultValue}
      value={value || defaultValue}
      {...args}
    />
  );
};

export const Default = Base.bind({});

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  defaultValue: 15,
  min: 10,
  max: 20,
};

export const Step = Base.bind({});
Step.args = {
  defaultValue: 15,
  min: 10,
  max: 30,
  step: 5,
};

export const Precision = Base.bind({});
Precision.args = {
  defaultValue: 15,
  min: 10,
  max: 30,
  step: 0.2,
  precision: 2,
};

export const ClampValueOnBlurFalse = Base.bind({});
ClampValueOnBlurFalse.args = {
  defaultValue: 15,
  min: 10,
  max: 30,
  step: 0.2,
  precision: 2,
  clampValueOnBlur: false,
  keepWithinRange: false,
};

export const KeepWithinRangeFalse = Base.bind({});
KeepWithinRangeFalse.args = {
  defaultValue: 15,
  min: 10,
  max: 30,
  step: 0.2,
  precision: 2,
  clampValueOnBlur: false,
  keepWithinRange: false,
};

export const Disabled = Base.bind({});
Disabled.args = {
  defaultValue: 15,
  min: 10,
  max: 20,
  isDisabled: true,
};

export const ReadOnly = Base.bind({});
ReadOnly.args = {
  defaultValue: 15,
  min: 10,
  max: 20,
  isReadOnly: true,
};

export const Options = Base.bind({});
Options.args = {
  min: 0,
  step: 1,
  max: 100,
  precision: 1,
  defaultValue: 5,
  isDisabled: false,
  isReadOnly: false,
  keepWithinRange: true,
  clampValueOnBlur: false,
  focusInputOnChange: false,
};

const NumberComponent: React.FC<any> = ({ onChange, value, name }) => {
  const state = useNumberInputState({
    onChange,
    value,
  });
  return (
    <>
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInput name={name} {...state} />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </>
  );
};

export const ReactHookForm = () => {
  const { control, handleSubmit } = useForm<{
    num: number;
  }>({ defaultValues: { num: 20 } });

  return (
    <form
      onSubmit={handleSubmit(values => {
        alert(JSON.stringify(values));
      })}
    >
      <div>
        <Controller
          name="num"
          control={control}
          render={NumberComponent as any}
        />
      </div>
    </form>
  );
};
