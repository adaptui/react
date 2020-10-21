import * as React from "react";
import { Button } from "reakit";
import { css, keyframes } from "emotion";

import {
  Progress,
  useProgressState,
  ProgressInitialState,
  ProgressState,
} from "../index";

export interface CircularProgressInitialState extends ProgressInitialState {
  /**
   * Adds a label to meter.
   * @default false
   */
  withLabel?: boolean;
}

export const CircularProgress: React.FC<CircularProgressInitialState> = props => {
  const { withLabel = false, children, ...rest } = props;
  const state = useProgressState(rest);
  const { value, setValue, percent, isIndeterminate } = state;

  React.useEffect(() => {
    const clearId = setInterval(() => {
      !isIndeterminate && setValue(prevValue => prevValue + 5);
    }, 500);

    if (value === 100) {
      clearInterval(clearId);
    }

    return () => {
      clearInterval(clearId);
    };
  }, [setValue, isIndeterminate, value]);

  return (
    <div>
      <div>
        <Progress {...state} className={rootStyles}>
          <svg viewBox="0 0 100 100" className={svgStyles(isIndeterminate)}>
            <circle
              cx={50}
              cy={50}
              r={42}
              fill="transparent"
              stroke="#edebe9"
              strokeWidth="10px"
            />
            <circle
              cx={50}
              cy={50}
              r={42}
              fill="transparent"
              stroke="#0078d4"
              strokeWidth="10px"
              className={indicatorStyles(isIndeterminate, percent)}
            />
          </svg>
          {withLabel ? (
            <div className={labelStyles}>{`${percent}%`}</div>
          ) : null}
        </Progress>
      </div>
      <br />
      <Button type="reset" onClick={() => setValue(0)}>
        Reset
      </Button>
    </div>
  );
};

const rootStyles = css({
  display: "inline-block",
  position: "relative",
  verticalAlign: "middle",
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

export const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

const svgStyles = (isIndeterminate: ProgressState["isIndeterminate"]) =>
  css({
    width: "48px",
    height: "48px",
    animation: isIndeterminate ? `${rotate} 2s linear infinite` : undefined,
  });

export const spin = keyframes({
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

const indicatorStyles = (
  isIndeterminate: ProgressState["isIndeterminate"],
  percent: ProgressState["percent"],
) => {
  const determinant = isIndeterminate ? undefined : (percent ?? 0) * 2.64;

  const strokeDasharray =
    determinant == null ? undefined : `${determinant} ${264 - determinant}`;

  return css({
    strokeDashoffset: 66,
    strokeDasharray,
    transition: `stroke-dasharray 0.6s ease 0s, stroke 0.6s ease`,
    animation: isIndeterminate ? `${spin} 1.5s linear infinite` : undefined,
  });
};
