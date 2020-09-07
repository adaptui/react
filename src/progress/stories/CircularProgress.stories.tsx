import React from "react";
import { Meta } from "@storybook/react";
import { css, keyframes } from "emotion";
import { isUndefined } from "@chakra-ui/utils";

import { Progress } from "../Progress";
import { useProgressState } from "../ProgressState";

export default {
  title: "Component/Progress/Circular",
} as Meta;

const spin = keyframes({
  "0%": {
    strokeDasharray: "1, 400",
    strokeDashoffset: "0",
  },
  "50%": {
    strokeDasharray: "400, 400",
    strokeDashoffset: "-100",
  },
  "100%": {
    strokeDasharray: "400, 400",
    strokeDashoffset: "-260",
  },
});

const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

const CircularProgress = (props: any) => {
  const {
    size = "48px",
    value,
    capIsRound,
    thickness = "10px",
    color = "#0078d4",
    trackColor = "#edebe9",
    label = false,
  } = props;

  const progress = useProgressState({ value });

  const determinant = progress.isIndeterminate
    ? undefined
    : (progress.percent ?? 0) * 2.64;

  const strokeDasharray = isUndefined(determinant)
    ? undefined
    : `${determinant} ${264 - determinant}`;

  const indicatorStyles = progress.isIndeterminate
    ? css({
        animation: `${spin} 1.5s linear infinite`,
      })
    : css({
        strokeDashoffset: 66,
        strokeDasharray,
        transition: `stroke-dasharray 0.6s ease 0s, stroke 0.6s ease`,
      });

  const rootStyles = css({
    display: "inline-block",
    position: "relative",
    verticalAlign: "middle",
  });

  const svgStyles = css({
    width: size,
    height: size,
    animation: progress.isIndeterminate
      ? `${rotate} 2s linear infinite`
      : undefined,
  });

  const labelStyles = css({
    fontSize: "14px",
    top: "50%",
    left: "50%",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  });

  return (
    <Progress {...progress} className={rootStyles}>
      <svg viewBox="0 0 100 100" className={svgStyles}>
        <circle
          cx={50}
          cy={50}
          r={42}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={thickness}
        />
        <circle
          cx={50}
          cy={50}
          r={42}
          fill="transparent"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap={capIsRound ? "round" : undefined}
          className={indicatorStyles}
        />
      </svg>
      {label && <div className={labelStyles}>{`${progress.value}%`}</div>}
    </Progress>
  );
};

export const Default = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const clearId = setInterval(() => {
      setValue(prevValue => prevValue + 5);
    }, 500);

    if (value === 100) {
      clearInterval(clearId);
    }

    return () => {
      clearInterval(clearId);
    };
  }, [value]);

  return <CircularProgress value={value} />;
};

export const WithLabel = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const clearId = setInterval(() => {
      setValue(prevValue => prevValue + 5);
    }, 500);

    if (value === 100) {
      clearInterval(clearId);
    }

    return () => {
      clearInterval(clearId);
    };
  }, [value]);

  return <CircularProgress value={value} label />;
};

export const IsIndeterminate = () => {
  return <CircularProgress />;
};
