import * as React from "react";

import { Progress, ProgressStateProps, useProgressState } from "../../index";

import "./ProgressBasic.css";

export const ProgressBasic: React.FC<ProgressStateProps> = props => {
  const state = useProgressState(props);
  const { percent, isIndeterminate } = state;

  return (
    <div className="progress">
      <Progress
        state={state}
        aria-label="progress"
        style={{ width: `${percent}%` }}
        className={`progressbar ${isIndeterminate ? "indeterminate" : ""}`}
      />
    </div>
  );
};

export default ProgressBasic;
