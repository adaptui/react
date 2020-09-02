import { Meta } from "@storybook/react";
import React, { CSSProperties } from "react";

import { Progress } from "../Progress";
import { css, keyframes } from "emotion";
import { ProgressBar } from "../ProgressBar";
import { useProgressState } from "../ProgressState";

export default {
  title: "Component/Progress",
} as Meta;

const progressStyle: CSSProperties = {
  background: "rgb(237, 242, 247)",
  height: "0.75rem",
  width: "400px",
};

const labelStyles: CSSProperties = {
  top: "50%",
  left: "50%",
  width: "100%",
  textAlign: "center",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  fontWeight: "bold",
  fontSize: "0.75em",
  lineHeight: 1,
};

const progressBarStyle: CSSProperties = {
  transition: "all 0.3s",
  backgroundColor: "#3182ce",
};

function generateStripe(size = "1rem", color = "rgba(255, 255, 255, 0.15)") {
  return {
    backgroundImage: `linear-gradient(
    45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  )`,
    backgroundSize: `${size} ${size}`,
  };
}

const stripe = keyframes({
  from: { backgroundPosition: "1rem 0" },
  to: { backgroundPosition: "0 0" },
});

export const Default = () => {
  const [value, setValue] = React.useState(0);

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
  }, [value]);

  const progress = useProgressState({ value });

  return (
    <Progress {...progress} style={progressStyle}>
      <ProgressBar {...progress} style={progressBarStyle} />
    </Progress>
  );
};

export const WithLabel = () => {
  const [value, setValue] = React.useState(0);

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
  }, [value]);

  const progress = useProgressState({ value });

  return (
    <Progress {...progress} style={progressStyle}>
      <div style={labelStyles}>{progress.value}</div>
      <ProgressBar {...progress} style={progressBarStyle} />
    </Progress>
  );
};

export const WithStripe = () => {
  const [value, setValue] = React.useState(0);

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
  }, [value]);

  const progress = useProgressState({ value });

  const stripStyles = css({
    ...generateStripe(),
  });

  return (
    <Progress {...progress} style={progressStyle}>
      <ProgressBar
        {...progress}
        className={stripStyles}
        style={progressBarStyle}
      />
    </Progress>
  );
};

export const WithAnimatedStripe = () => {
  const [value, setValue] = React.useState(0);

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
  }, [value]);

  const progress = useProgressState({ value });

  const stripStyles = css({
    ...generateStripe(),
    animation: `${stripe} 1s linear infinite`,
  });

  return (
    <Progress {...progress} style={progressStyle}>
      <ProgressBar
        {...progress}
        className={stripStyles}
        style={progressBarStyle}
      />
    </Progress>
  );
};

export const WhenIsIndeterminate = () => {
  const progress = useProgressState({ value: undefined });

  const progressAnim = keyframes({
    "0%": { left: "-40%" },
    "100%": { left: "100%" },
  });

  const indeterminateStyles = css({
    ...(progress.isIndeterminate && {
      position: "absolute",
      willChange: "left",
      minWidth: "50%",
      backgroundImage:
        "linear-gradient( to right, transparent 0%, #D53F8C 50%, transparent 100% )",
      animation: `${progressAnim} 1s ease infinite normal none running`,
    }),
  });

  return (
    <Progress {...progress} style={progressStyle}>
      <ProgressBar
        {...progress}
        style={{ ...progressBarStyle, backgroundColor: "none" }}
        className={indeterminateStyles}
      />
    </Progress>
  );
};

export const WhenIsIndeterminateStripe = () => {
  const progress = useProgressState();

  const progressAnim = keyframes({
    "0%": { left: "-40%" },
    "100%": { left: "100%" },
  });

  const indeterminateStyles = css({
    ...(progress.isIndeterminate && {
      position: "absolute",
      willChange: "left",
      minWidth: "50%",
      ...generateStripe(),
      animation: `${progressAnim} 1s ease infinite normal none running`,
    }),
  });

  return (
    <Progress {...progress} style={progressStyle}>
      <ProgressBar
        {...progress}
        style={{ ...progressBarStyle, backgroundColor: "#D53F8C" }}
        className={indeterminateStyles}
      />
    </Progress>
  );
};
