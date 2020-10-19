import { css } from "emotion";
import * as React from "react";
import { Button } from "reakit";

import {
  Progress,
  useProgressState,
  ProgressState,
  ProgressInitialState,
} from "../index";

export interface StyledProgressInitialState extends ProgressInitialState {}

export const StyledProgress: React.FC<StyledProgressInitialState> = props => {
  const { children, ...rest } = props;
  const { value, setValue, ...state } = useProgressState(rest);
  console.log("%c state", "color: #735656", state);

  React.useEffect(() => {
    const clearId = setInterval(() => {
      setValue(prevValue => prevValue + 5);
    }, 500);

    if (value === 100) {
      clearInterval(clearId);
    }

    return () => {
      clearInterval(clearId);
    };
  }, [setValue, value]);

  React.useEffect(() => {
    state.setAriaValueText((value, percent) => `${value}`);
  }, [state]);

  return (
    <div>
      <div style={progressStyle}>
        <Progress
          {...state}
          value={value}
          className={progressBarStyle(state.percent)}
        />
      </div>
      <br />
      <Button type="reset" onClick={() => setValue(0)}>
        Reset
      </Button>
    </div>
  );
};

const progressStyle: React.CSSProperties = {
  background: "rgb(237, 242, 247)",
  height: "0.75rem",
  width: "400px",
  overflow: "hidden",
  position: "relative",
};

const progressBarStyle = (percent: ProgressState["percent"]) => {
  return css({
    transition: "all 0.3s",
    backgroundColor: "#3182ce",
    width: `${percent}%`,
    height: "100%",
  });
};
