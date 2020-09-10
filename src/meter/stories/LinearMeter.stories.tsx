import { Meta } from "@storybook/react";

import { Meter } from "../Meter";
import { useMeterState } from "../index";
import { createLinearExamples } from "../../utils";

export default {
  title: "Component/Meter/Linear",
} as Meta;

const examples = createLinearExamples({
  stateHook: useMeterState,
  component: Meter,
  type: "meter",
})();

export const Default = examples.Default;
export const WithLabel = examples.WithLabel;
export const WithStripe = examples.WithStripe;
export const WithAnimatedStripe = examples.WithAnimatedStripe;
