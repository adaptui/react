/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Meta } from "@storybook/react";

import { Radio, useRadio, useRadioState, RadioGroup } from "../index";

export default {
  title: "Component/Radio",
  component: Radio,
} as Meta;

export function Component() {
  const radio = useRadioState();
  return (
    <RadioGroup {...radio} aria-label="fruits">
      <label>
        <Radio {...radio} value="apple" /> apple
      </label>
      <label>
        <Radio {...radio} value="orange" /> orange
      </label>
      <label>
        <Radio {...radio} value="watermelon" /> watermelon
      </label>
    </RadioGroup>
  );
}

export function DefaultValue() {
  const radio = useRadioState({ state: "orange" });
  return (
    <RadioGroup {...radio} aria-label="fruits">
      <label>
        <Radio {...radio} value="apple" /> apple
      </label>
      <label>
        <Radio {...radio} value="orange" /> orange
      </label>
      <label>
        <Radio {...radio} value="watermelon" /> watermelon
      </label>
    </RadioGroup>
  );
}
