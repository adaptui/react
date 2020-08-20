import { CSSProperties } from "react";

export const sliderStyle: CSSProperties = {
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
};

export const sliderTrackStyle: CSSProperties = {
  overflow: "hidden",
  borderRadius: "0.125rem",
  background: "rgb(226, 232, 240)",
};

export const sliderFilledTractStyle: CSSProperties = {
  background: "rgb(49, 130, 206)",
};

export const sliderThumbStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  width: "14px",
  height: "14px",
  outline: "0px",
  borderRadius: "9999px",
  background: "rgb(255, 255, 255)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderImage: "initial",
  borderColor: "transparent",
  transition: "transform 0.2s ease 0s",
};

export const sliderHorizontalStyle: CSSProperties = {
  ...sliderStyle,
  width: "100%",
};

export const sliderHorizontalTrackStyle: CSSProperties = {
  ...sliderTrackStyle,
  height: "4px",
};

export const sliderHorizontalFilledTractStyle: CSSProperties = {
  ...sliderFilledTractStyle,
  height: "inherit",
};

export const sliderHorizontalThumbStyle: CSSProperties = {
  ...sliderThumbStyle,
  top: "50%",
  transform: "translateY(-50%)",
};

export const sliderVerticalStyle: CSSProperties = {
  ...sliderStyle,
  height: "200px",
};

export const sliderVerticalTrackStyle: CSSProperties = {
  ...sliderTrackStyle,
  width: "4px",
};

export const sliderVerticalFilledTractStyle: CSSProperties = {
  ...sliderFilledTractStyle,
  width: "inherit",
};

export const sliderVerticalThumbStyle: CSSProperties = {
  ...sliderThumbStyle,
  left: "50%",
  transform: "translateX(-50%)",
};
