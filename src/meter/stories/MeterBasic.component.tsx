import * as React from "react";

import { Meter, MeterStateProps, useMeterState } from "../../index";

export const MeterBasic: React.FC<MeterStateProps> = props => {
  const state = useMeterState(props);
  const { percent, status } = state;

  return (
    <div className="meter">
      <Meter
        aria-label="meter"
        className="meterbar"
        style={{
          width: `${percent}%`,
          backgroundColor: status == null ? undefined : background[status],
        }}
        state={state}
      ></Meter>
    </div>
  );
};

export default MeterBasic;

const background = {
  safe: "#8bcf69",
  caution: "#e6d450",
  danger: "#f28f68",
};
