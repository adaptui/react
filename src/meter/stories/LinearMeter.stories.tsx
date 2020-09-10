import React from "react";
import { Meta } from "@storybook/react";

import { Meter } from "../Meter";
import { useMeterState } from "../index";
import {
  createLinearExamples,
  progressBarStyle,
  progressStyle,
} from "../../utils";

export default {
  title: "Component/Meter/Linear",
} as Meta;

const examples = createLinearExamples({
  stateHook: useMeterState,
  component: Meter,
  type: "meter",
})();

const background = {
  safe: "green",
  caution: "yellow",
  danger: "red",
};

export const Default = () => {
  const meter = useMeterState({
    max: 2,
    value: 1.8,
    low: 0.25,
    optimum: 0.2,
    high: 1.75,
  });
  const { status } = meter;
  const styles = {
    background: status == null ? undefined : background[status],
  };

  return (
    <div style={progressStyle}>
      <Meter
        {...meter}
        className={progressBarStyle(meter.percent)}
        style={styles}
      />
    </div>
  );
};

export const WithLabel = examples.WithLabel;
export const WithStripe = examples.WithStripe;
export const WithAnimatedStripe = examples.WithAnimatedStripe;
