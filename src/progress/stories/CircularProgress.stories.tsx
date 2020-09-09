import React from "react";
import { Meta } from "@storybook/react";

import { Progress } from "../Progress";
import { useProgressState } from "../ProgressState";
import { useFakeProgression, createCircularExample } from "../../utils";

export default {
  title: "Component/Progress/Circular",
} as Meta;

const CircularProgress = createCircularExample({
  stateHook: useProgressState,
  component: Progress,
});

export const Default = () => {
  const value = useFakeProgression();

  return <CircularProgress value={value} />;
};

export const WithLabel = () => {
  const value = useFakeProgression();

  return <CircularProgress value={value} label />;
};

export const IsIndeterminate = () => {
  return <CircularProgress />;
};
