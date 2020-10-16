import * as React from "react";
import { css, cx, keyframes } from "emotion";

import { MeterStateReturn } from "../MeterState";
import { Meter, useMeterState, UseMeterProps } from "../index";
import { generateStripe } from "../../progress/stories/storybook-progress-utils";

// CSS Styles from https://css-tricks.com/html5-meter-element/
const meterStyle = css({
  position: "relative",
  width: "500px",
  height: "1rem",
  background: "whiteSmoke",
  borderRadius: "3px",
  border: "1px solid #ccc",
  boxShadow: "0 5px 5px -5px #333 inset",
  overflow: "hidden",
});

const background = {
  safe: "#8bcf69",
  caution: "#e6d450",
  danger: "#f28f68",
};

const labelStyles = css({
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

const stripeAnim = keyframes({
  from: { backgroundPosition: "1rem 0" },
  to: { backgroundPosition: "0 0" },
});

const meterBarStyle = (meter: MeterStateReturn, props: IStyledMeter) => {
  const { percent, status } = meter;
  const { withStripe, withStripeAnimation } = props;

  return css({
    backgroundColor: status == null ? undefined : background[status],
    width: percent != null ? `${percent}%` : 0,
    height: "100%",
    ...(withStripe && { ...generateStripe() }),
    ...(withStripe &&
      withStripeAnimation && { animation: `${stripeAnim} 1s linear infinite` }),
  });
};

export interface IStyledMeter extends UseMeterProps {
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

export const StyledMeter: React.FC<IStyledMeter> = props => {
  const {
    value,
    low,
    high,
    optimum,
    min,
    max,
    withLabel = false,
    withStripe = false,
    withStripeAnimation = false,
    ...rest
  } = props;

  const meter = useMeterState({
    value,
    low,
    high,
    optimum,
    min,
    max,
  });

  return (
    <div className={meterStyle}>
      <Meter
        className={cx(meterBarStyle(meter, props))}
        {...meter}
        {...rest}
      ></Meter>
      {withLabel && <div className={labelStyles}>{`${meter.percent}%`}</div>}
    </div>
  );
};
