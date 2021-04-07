import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { Controller, useForm } from "react-hook-form";

import {
  NumberInput as NumberInputComp,
  useNumberInputState,
  NumberInputDecrementButton,
  NumberInputIncrementButton,
} from "../index";
import { App as NumberInput } from "./NumberInput.component";
import { numberInputTemplate, numberInputTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: NumberInput,
  title: "NumberInput",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: numberInputTemplateJs,
      ts: numberInputTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <NumberInput {...args} />;

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
  step: 0.5,
  precision: 2,
};

export const KeepWithinRangeFalse = Base.bind({});
KeepWithinRangeFalse.args = {
  defaultValue: 15,
  min: 10,
  max: 30,
  step: 5,
  keepWithinRange: false,
};

export const FocusInputOnChangeFalse = Base.bind({});
FocusInputOnChangeFalse.args = {
  defaultValue: 15,
  min: 10,
  max: 30,
  step: 5,
  focusInputOnChange: false,
};

export const ClampValueOnBlurFalse = Base.bind({});
ClampValueOnBlurFalse.args = {
  defaultValue: 15,
  min: 10,
  max: 30,
  step: 5,
  clampValueOnBlur: false,
};

export const MouseWheelScrollFalse = Base.bind({});
MouseWheelScrollFalse.args = {
  defaultValue: 15,
  min: 10,
  max: 30,
  step: 5,
  allowMouseWheel: false,
};

const NumberComponent: React.FC<any> = props => {
  const { value, onChange, ...rest } = props.field;
  const state = useNumberInputState({ value, onChange });

  return (
    <>
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInputComp {...state} {...rest} />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </>
  );
};

export const ReactHookForm = () => {
  const { control, handleSubmit } = useForm<{
    num: number;
  }>();

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
          defaultValue={20}
          render={NumberComponent as any}
        />
      </div>
    </form>
  );
};
