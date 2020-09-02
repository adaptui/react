import { CSSProperties } from "react";

import { SliderStateProps } from "./SliderState";

export function orient(options: {
  orientation: SliderStateProps["orientation"];
  vertical: CSSProperties;
  horizontal: CSSProperties;
}) {
  const { orientation, vertical, horizontal } = options;

  return orientation === "vertical" ? vertical : horizontal;
}

/**
 * The browser <input type="range" /> calculates
 * the default value of a slider by using mid-point
 * between the min and the max.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
 */
export function getDefaultValue(min: number, max: number) {
  return max < min ? min : min + (max - min) / 2;
}
