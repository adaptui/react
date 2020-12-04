import * as React from "react";

import {
  Progress,
  useProgressState,
  ProgressInitialState,
} from "@renderlesskit/react";

export const App: React.FC<ProgressInitialState> = props => {
  const state = useProgressState(props);
  const { value, percent, isIndeterminate } = state;

  return (
    <div className="progress">
      <Progress
        {...state}
        value={value}
        aria-label="progress"
        style={{ width: `${percent}%` }}
        className={`progressbar ${isIndeterminate ? "indeterminate" : ""}`}
      />
    </div>
  );
};

export default App;
