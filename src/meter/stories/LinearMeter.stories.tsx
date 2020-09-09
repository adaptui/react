import React from "react";
import { Meta } from "@storybook/react";
import { css, keyframes, cx } from "emotion";

import { Meter } from "../Meter";
import { useMeterState } from "../index";
import {
  labelStyles,
  progressStyle,
  generateStripe,
  progressBarStyle,
  useFakeProgression,
} from "../../utils";

export default {
  title: "Component/Meter/Linear",
} as Meta;

export const Default = () => {
  const value = useFakeProgression();
  const progress = useMeterState({ value });

  return (
    <div style={progressStyle}>
      <Meter {...progress} className={progressBarStyle(progress.percent)} />
    </div>
  );
};

export const WithLabel = () => {
  const value = useFakeProgression();
  const progress = useMeterState({ value });

  return (
    <div style={progressStyle}>
      <div style={labelStyles}>{progress.value}</div>
      <Meter {...progress} className={progressBarStyle(progress.percent)} />
    </div>
  );
};

export const WithStripe = () => {
  const value = useFakeProgression();
  const progress = useMeterState({ value });

  const stripStyles = css({
    ...generateStripe(),
  });

  return (
    <div style={progressStyle}>
      <Meter
        {...progress}
        className={cx(progressBarStyle(progress.percent), stripStyles)}
      />
    </div>
  );
};

export const WithAnimatedStripe = () => {
  const value = useFakeProgression();
  const progress = useMeterState({ value });

  const stripe = keyframes({
    from: { backgroundPosition: "1rem 0" },
    to: { backgroundPosition: "0 0" },
  });

  const stripStyles = css({
    ...generateStripe(),
    animation: `${stripe} 1s linear infinite`,
  });

  return (
    <div style={progressStyle}>
      <Meter
        {...progress}
        className={cx(progressBarStyle(progress.percent), stripStyles)}
      />
    </div>
  );
};
