import React from "react";
import { Meta } from "@storybook/react";

import { Meter } from "../Meter";
import { useMeterState, UseMeterProps } from "../index";
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

const MeterComp: React.FC<UseMeterProps> = props => {
  const meter = useMeterState(props);
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

export const Default = () => {
  return (
    <div>
      <h1>Default</h1>
      <kbd>{`<meter max=1 min=0 value=0 high=1 low=0 optimum=0.5></meter>`}</kbd>
      <br />
      <h4>Case 1 - No attributes</h4>
      <MeterComp />
      <br />
      <h4>{`Case 2 - value < max (default: min=0, max=1)`}</h4>
      <MeterComp value={0.5} />
      <br />
      <h4>{`Case 3 - value = max (default: min=0, max=1)`}</h4>
      <MeterComp value={1} />
      <br />
      <h4>{`Case 4 - value > max (default: min=0, max=1)`}</h4>
      <MeterComp value={5} />
      <br />
      <h4>{`Case 6 - value = min (default: min=0, max=1)`}</h4>
      <MeterComp value={0} />
      <br />
      <h4>{`Case 7 - value > min (default: min=0, max=1)`}</h4>
      <MeterComp value={0.5} />
      <br />
      <h4>{`Case 8 - value < high (default: min=0, max=1)`}</h4>
      <MeterComp value={0.5} high={0.8} />
      <br />
      <h4>{`Case 9 - value = high (default: min=0, max=1)`}</h4>
      <MeterComp value={0.8} high={0.8} />
      <br />
      <h4>{`Case 10 - value > high (default: min=0, max=1)`}</h4>
      <MeterComp value={0.9} high={0.8} />
      <br />
      <h4>{`Case 11 - value < low (default: min=0, max=1)`}</h4>
      <MeterComp value={0.15} low={0.25} />
      <br />
      <h4>{`Case 12 - value = low (default: min=0, max=1)`}</h4>
      <MeterComp value={0.25} low={0.25} />
      <br />
      <h4>{`Case 13 - value > low (default: min=0, max=1)`}</h4>
      <MeterComp value={0.5} low={0.25} />
      <br />
      <h4>{`Case 14 - optimum < low < high (default: min=0, max=1)`}</h4>
      <MeterComp low={0.25} optimum={0.15} high={0.75} value={0.5} />
      <br />
      <h4>{`Case 15 - low < optimum < high (default: min=0, max=1)`}</h4>
      <MeterComp low={0.25} optimum={0.5} high={0.75} value={0.5} />
      <br />
      <h4>{`Case 16 - low < high < optimum (default: min=0, max=1)`}</h4>
      <MeterComp low={0.25} optimum={0.85} high={0.75} value={0.5} />
      <br />
      <h4>{`Case 17 - value < low < high < optimum (default: min=0, max=1)`}</h4>
      <MeterComp low={0.25} optimum={0.8} high={0.75} value={0.2} />
      <br />
      <h4>{`Case 18 - value > high > low > optimum (default: min=0, max=1)`}</h4>
      <MeterComp low={0.25} optimum={0.2} high={0.75} value={0.8} />
    </div>
  );
};

export const WithLabel = examples.WithLabel;
export const WithStripe = examples.WithStripe;
export const WithAnimatedStripe = examples.WithAnimatedStripe;
