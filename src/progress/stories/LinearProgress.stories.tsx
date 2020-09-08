import React from "react";
import { Meta } from "@storybook/react";
import { css, keyframes, cx } from "emotion";

import { Progress } from "../Progress";
import { useProgressState } from "../ProgressState";
import {
  generateStripe,
  labelStyles,
  progressBarStyle,
  progressStyle,
  useProgressSimulation,
} from "./utils";

export default {
  title: "Component/Progress/Linear",
} as Meta;

export const Default = () => {
  const value = useProgressSimulation();
  const progress = useProgressState({ value });

  return (
    <div style={progressStyle}>
      <Progress {...progress} className={progressBarStyle(progress.percent)} />
    </div>
  );
};

export const WithLabel = () => {
  const value = useProgressSimulation();
  const progress = useProgressState({ value });

  return (
    <div style={progressStyle}>
      <div style={labelStyles}>{progress.value}</div>
      <Progress {...progress} className={progressBarStyle(progress.percent)} />
    </div>
  );
};

export const WithStripe = () => {
  const value = useProgressSimulation();
  const progress = useProgressState({ value });

  const stripStyles = css({
    ...generateStripe(),
  });

  return (
    <div style={progressStyle}>
      <Progress
        {...progress}
        className={cx(progressBarStyle(progress.percent), stripStyles)}
      />
    </div>
  );
};

export const WithAnimatedStripe = () => {
  const value = useProgressSimulation();
  const progress = useProgressState({ value });

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
      <Progress
        {...progress}
        className={cx(progressBarStyle(progress.percent), stripStyles)}
      />
    </div>
  );
};

export const WhenIsIndeterminate = () => {
  const progress = useProgressState({ value: undefined });

  const progressAnim = keyframes({
    "0%": { left: "-40%" },
    "100%": { left: "100%" },
  });

  const indeterminateStyles = css({
    ...(progress.isIndeterminate && {
      position: "absolute",
      willChange: "left",
      minWidth: "50%",
      width: "100%",
      height: "100%",
      backgroundImage:
        "linear-gradient( to right, transparent 0%, #D53F8C 50%, transparent 100% )",
      animation: `${progressAnim} 1s ease infinite normal none running`,
    }),
  });

  return (
    <div style={progressStyle}>
      <Progress
        {...progress}
        style={{ ...progressBarStyle, backgroundColor: "none" }}
        className={indeterminateStyles}
      />
    </div>
  );
};

export const WhenIsIndeterminateStripe = () => {
  const progress = useProgressState();

  const progressAnim = keyframes({
    "0%": { left: "-40%" },
    "100%": { left: "100%" },
  });

  const indeterminateStyles = css({
    ...(progress.isIndeterminate && {
      position: "absolute",
      willChange: "left",
      minWidth: "50%",
      width: "100%",
      height: "100%",
      ...generateStripe(),
      animation: `${progressAnim} 1s ease infinite normal none running`,
    }),
  });

  return (
    <div style={progressStyle}>
      <Progress
        {...progress}
        style={{ ...progressBarStyle, backgroundColor: "#D53F8C" }}
        className={indeterminateStyles}
      />
    </div>
  );
};
