import * as React from "react";
import { css, keyframes } from "@emotion/css";

import {
  Meter,
  useMeterState,
  MeterStateReturn,
  MeterInitialState,
} from "../../index";

export interface AppProps extends MeterInitialState {
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
    // withStripe = false,
    // withStripeAnimation = false,
    ...rest
  } = props;
  const meter = useMeterState(rest);

  return (
    <div className={meterStyle}>
      <Meter
        className={meterBarStyle(meter, props)}
        aria-label="meter"
        {...meter}
        {...rest}
      ></Meter>
      {withLabel && <div className={labelStyles}>{`${meter.percent}%`}</div>}
    </div>
  );
};

export default App;

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

const background = {
  safe: "#8bcf69",
  caution: "#e6d450",
  danger: "#f28f68",
};

const generateStripe = {
  backgroundImage: `linear-gradient(
  45deg,
  rgba(255, 255, 255, 0.15) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, 0.15) 50%,
  rgba(255, 255, 255, 0.15) 75%,
  transparent 75%,
  transparent
)`,
  backgroundSize: "1rem 1rem",
};

function meterBarStyle(meter: MeterStateReturn, props: AppProps) {
  const { percent, status } = meter;
  const { withStripe, withStripeAnimation } = props;

  return css({
    backgroundColor: status == null ? undefined : background[status],
    width: percent != null ? `${percent}%` : 0,
    height: "100%",
    ...(withStripe && { ...generateStripe }),
    ...(withStripe &&
      withStripeAnimation && { animation: `${stripeAnim} 1s linear infinite` }),
  });
}
