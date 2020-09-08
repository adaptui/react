import { css } from "emotion";
import React, { CSSProperties } from "react";

export const progressStyle: CSSProperties = {
  background: "rgb(237, 242, 247)",
  height: "0.75rem",
  width: "400px",
  overflow: "hidden",
  position: "relative",
};

export const labelStyles: CSSProperties = {
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

export const progressBarStyle = (percent: any) => {
  return css({
    transition: "all 0.3s",
    backgroundColor: "#3182ce",
    width: percent != null ? `${percent}%` : undefined,
    height: "100%",
  });
};

export function generateStripe(
  size = "1rem",
  color = "rgba(255, 255, 255, 0.15)",
) {
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

export function useMeterSimulation() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const clearId = setInterval(() => {
      setValue(prevValue => prevValue + 5);
    }, 500);

    if (value === 100) {
      setValue(5);
    }

    return () => {
      clearInterval(clearId);
    };
  }, [value]);

  return value;
}
