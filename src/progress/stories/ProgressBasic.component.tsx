import * as React from "react";

import {
  Progress as RenderlesskitProgress,
  useProgressState,
  ProgressInitialState,
} from "../../index";

export const Progress: React.FC<ProgressInitialState> = props => {
  const state = useProgressState(props);
  const { value, percent, isIndeterminate } = state;

  return (
    <div className="progress">
      <RenderlesskitProgress
        {...state}
        value={value}
        aria-label="progress"
        style={{ width: `${percent}%` }}
        className={`progressbar ${isIndeterminate ? "indeterminate" : ""}`}
      />
    </div>
  );
};

export default Progress;
