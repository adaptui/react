import * as React from "react";

import { Meter, useMeterState, MeterInitialState } from "@renderlesskit/react";

export const App: React.FC<MeterInitialState> = props => {
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
        {...state}
      ></Meter>
    </div>
  );
};

export default App;

const background = {
  safe: "#8bcf69",
  caution: "#e6d450",
  danger: "#f28f68",
};
