/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Meta } from "@storybook/react";
import { Button, useCheckboxState } from "reakit";

import { Checkbox, useCheckbox } from "../index";

export default {
  title: "Component/Checkbox",
  component: Checkbox,
} as Meta;

export function Component() {
  const [checked, setChecked] = React.useState(false);
  const toggle = () => setChecked(!checked);

  return (
    <label>
      <Checkbox checked={checked} onChange={toggle} />
      Checkbox
    </label>
  );
}

export function Hook() {
  const [checked, setChecked] = React.useState(false);
  const toggle = () => setChecked(!checked);

  const props = useCheckbox({ checked });

  return (
    <label>
      <input {...props} onChange={toggle} />
      Checkbox
    </label>
  );
}

export function DifferentElement() {
  const [checked, setChecked] = React.useState(false);
  const toggle = () => setChecked(!checked);

  return (
    <Checkbox as={Button} checked={checked} onChange={toggle}>
      {checked ? "Uncheck" : "Check"}
    </Checkbox>
  );
}

export function StateHook() {
  const checkbox = useCheckboxState({ state: true });

  return (
    <label>
      <Checkbox {...checkbox} />
      Checkbox
    </label>
  );
}

export function MultipleCheckbox() {
  const checkbox = useCheckboxState({ state: [] });

  return (
    <>
      <div>Choices: {checkbox.state.join(", ")}</div>
      <label>
        <Checkbox {...checkbox} value="apple" />
        Apple
      </label>
      <label>
        <Checkbox {...checkbox} value="orange" />
        Orange
      </label>
      <label>
        <Checkbox {...checkbox} value="watermelon" />
        Watermelon
      </label>
    </>
  );
}

function useTreeState({ values }: { values: any }) {
  const group = useCheckboxState();
  const items = useCheckboxState();

  // updates items when group is toggled
  React.useEffect(() => {
    if (group.state === true) {
      items.setState(values);
    } else if (group.state === false) {
      items.setState([]);
    }
  }, [group.state]);

  // updates group when items is toggled
  React.useEffect(() => {
    if (items.state.length === values.length) {
      group.setState(true);
    } else if (items.state.length) {
      group.setState("indeterminate");
    } else {
      group.setState(false);
    }
  }, [items.state]);

  return { group, items };
}

export function Indeterminate() {
  const values = ["Apple", "Orange", "Watermelon"];
  const { group, items } = useTreeState({ values });

  return (
    <ul>
      <li>
        <label>
          <Checkbox {...group} /> Fruits
        </label>
      </li>
      <ul>
        {values.map((value, i) => (
          <li key={i}>
            <label>
              <Checkbox {...items} value={value} /> {value}
            </label>
          </li>
        ))}
      </ul>
    </ul>
  );
}
