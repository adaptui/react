import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { Controller, useForm } from "react-hook-form";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import {
  NumberInput as NumberInputComp,
  useNumberInputState,
  NumberInputDecrementButton,
  NumberInputIncrementButton,
} from "../index";
import { appTemplate } from "./templates";
import { App as NumberInput } from "./NumberInput.component";

export default {
  component: NumberInput,
  title: "NumberInput",
  parameters: {
    preview: [
      {
        tab: "React",
        template: appTemplate,
        language: "tsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
    ],
  },
} as Meta;

const Base: Story = args => <NumberInput {...args} />;

export const Default = Base.bind({});

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  value: 15,
  min: 10,
  max: 20,
};

export const Step = Base.bind({});
Step.args = {
  value: 15,
  min: 10,
  max: 30,
  step: 5,
};

export const Precision = Base.bind({});
Precision.args = {
  value: 15,
  min: 10,
  max: 30,
  step: 0.5,
  precision: 2,
};

export const KeepWithinRangeFalse = Base.bind({});
KeepWithinRangeFalse.args = {
  value: 15,
  min: 10,
  max: 30,
  step: 5,
  keepWithinRange: false,
};

export const FocusInputOnChangeFalse = Base.bind({});
FocusInputOnChangeFalse.args = {
  value: 15,
  min: 10,
  max: 30,
  step: 5,
  focusInputOnChange: false,
};

export const ClampValueOnBlurFalse = Base.bind({});
ClampValueOnBlurFalse.args = {
  value: 15,
  min: 10,
  max: 30,
  step: 5,
  clampValueOnBlur: false,
};

export const MouseWheelScrollFalse = Base.bind({});
MouseWheelScrollFalse.args = {
  value: 15,
  min: 10,
  max: 30,
  step: 5,
  allowMouseWheel: false,
};

const Direct: React.FC<any> = () => {
  const state = useNumberInputState();

  return (
    <>
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInputComp name={name} {...state} />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </>
  );
};

const OnChange: React.FC<any> = ({ onChange, value, name }) => {
  const state = useNumberInputState({ value });

  React.useEffect(() => {
    onChange?.(state.value);
  }, [onChange, state.value]);

  return (
    <>
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInputComp name={name} {...state} />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </>
  );
};

const NumberComponent: React.FC<any> = ({ onChange, value, name }) => {
  const state = useNumberInputState({ value });
  console.log("%c state", "color: #00258c", state);
  const { value: stateValue, setValue: setStateValue } = state;

  React.useEffect(() => {
    onChange?.(stateValue);
  }, [onChange, stateValue]);

  React.useEffect(() => {
    setStateValue(value);
  }, [setStateValue, value]);

  return (
    <>
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInputComp name={name} {...state} />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </>
  );
};

export const Controllable = () => {
  const [value, setValue] = React.useState("42");

  return (
    <div>
      <p>Direct usage</p>
      <Direct />
      <br />
      <br />

      <p>With OnChange</p>
      <p>
        Changing the native input value does not change the NumberInput's value
      </p>
      <p>
        Because the value prop we send to NumberComponent will only be taken on
        first render as initial value. Any further changes will be ignored
        because we sealed that initial value.
      </p>
      <input
        type="number"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <br />
      <OnChange value={value} onChange={setValue} />
      <br />
      <br />
      <p>With both Value & OnChange</p>
      <p>Now changing the native input value changes the NumberInput's value</p>
      <input
        type="number"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <br />
      <NumberComponent value={value} onChange={setValue} />
      <br />
      <br />
    </div>
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
