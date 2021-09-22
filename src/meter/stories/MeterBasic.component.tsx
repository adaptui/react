import * as React from "react";

import {
  Meter as RenderlesskitMeter,
  MeterInitialState,
  useMeterState,
} from "../../index";

export const Meter: React.FC<MeterInitialState> = props => {
  const state = useMeterState(props);
  const { percent, status } = state;

  return (
    <div className="meter">
      <RenderlesskitMeter
        aria-label="meter"
        className="meterbar"
        style={{
          width: `${percent}%`,
          backgroundColor: status == null ? undefined : background[status],
        }}
        {...state}
      ></RenderlesskitMeter>
    </div>
  );
};

export default Meter;

const background = {
  safe: "#8bcf69",
  caution: "#e6d450",
  danger: "#f28f68",
};
