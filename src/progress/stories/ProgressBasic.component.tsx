import * as React from "react";

import { Progress, ProgressStateProps, useProgressState } from "../../index";

export const ProgressBasic: React.FC<ProgressStateProps> = props => {
  const state = useProgressState({ value: 50, ...props });
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
