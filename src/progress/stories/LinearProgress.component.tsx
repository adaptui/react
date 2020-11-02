import * as React from "react";
import { Button } from "reakit";
import { css, keyframes } from "emotion";

import { cx } from "../../utils";
import { Progress, useProgressState, ProgressState } from "../index";

type AriaValueText =
  | string
  | ((value: number | null, percent: number | null) => string);

export interface AppProps {
  /**
   * The `value` of the progress indicator.
   *
   * If `null` the progress bar will be in `indeterminate` state
   * @default 0
   */
  value?: number | null;
  /**
   * The minimum value of the progress
   * @default 0
   */
  min?: number;
  /**
   * The maximum value of the
   * @default 100
   */
  max?: number;
  /**
   * Defines the human readable text alternative of aria-valuenow for a range widget.
   */
  ariaValueText?: AriaValueText;
  /**
   * Adds a label to meter.
   * @default false
   */
  withLabel?: boolean;
  /**
   * Adds a stripe style to meter bar.
   * @default false
   */
  withStripe?: boolean;
  /**
   * Adds animation to the stripe.
   * @default false
   */
  withStripeAnimation?: boolean;
}

export const App: React.FC<AppProps> = props => {
  const {
    children,
    withLabel = false,
    withStripe = false,
    withStripeAnimation = false,
    ...rest
  } = props;
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
      <div className={progressStyle}>
        {withLabel ? <div className={labelStyles}>{`${percent}%`}</div> : null}
        <Progress
          {...state}
          value={value}
          aria-label="progress"
          className={cx(
            progressBarStyle(percent),
            withStripe && stripStyles,
            withStripe && withStripeAnimation && stripAnim,
            isIndeterminate && indeterminateStyles,
          )}
        />
      </div>
      <br />
      <Button type="reset" onClick={() => setValue(0)}>
        Reset
      </Button>
    </div>
  );
};

export default App;

const progressStyle = css({
  background: "rgb(237, 242, 247)",
  height: "0.5rem",
  width: "400px",
  overflow: "hidden",
  position: "relative",
});

const progressBarStyle = (percent: ProgressState["percent"]) => {
  return css({
    transition: "all 0.3s",
    backgroundColor: "#3182ce",
    width: `${percent}%`,
    height: "100%",
  });
};

export const labelStyles = css({
  top: "50%",
  left: "50%",
  width: "100%",
  textAlign: "center",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  fontWeight: "bold",
  fontSize: "0.75em",
  lineHeight: 1,
});

function generateStripe(size = "1rem", color = "rgba(255, 255, 255, 0.15)") {
  return css({
    backgroundImage: `linear-gradient(
    45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  )`,
    backgroundSize: `${size} ${size}`,
  });
}

const stripStyles = generateStripe();

const stripe = keyframes({
  from: { backgroundPosition: "1rem 0" },
  to: { backgroundPosition: "0 0" },
});

const stripAnim = css({
  animation: `${stripe} 1s linear infinite`,
});

const progressAnim = keyframes({
  "0%": { left: "-40%" },
  "100%": { left: "100%" },
});

const indeterminateStyles = css({
  position: "absolute",
  willChange: "left",
  minWidth: "50%",
  width: "100%",
  height: "100%",
  backgroundImage:
    "linear-gradient( to right, transparent 0%, #3182ce 50%, transparent 100% )",
  animation: `${progressAnim} 1s ease infinite normal none running`,
});
