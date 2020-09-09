import React from "react";
import { Meta } from "@storybook/react";

import { Meter } from "../Meter";
import { useMeterState } from "../index";
import { useFakeProgression, createCircularExample } from "../../utils";

export default {
  title: "Component/Meter/Circular",
} as Meta;

const CircularMeter = createCircularExample({
  stateHook: useMeterState,
  component: Meter,
});

export const Default = () => {
  const value = useFakeProgression();

  return <CircularMeter value={value} />;
};

export const WithLabel = () => {
  const value = useFakeProgression();

  return <CircularMeter value={value} label />;
};
