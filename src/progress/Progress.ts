import { BoxHTMLProps, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { PROGRESS_KEYS } from "./__keys";
import { useProgressReturn } from "./ProgressState";

export const useProgress = createHook<useProgressReturn, BoxHTMLProps>({
  name: "Progress",
  compose: useBox,
  keys: PROGRESS_KEYS,

  useProps(options, { style: htmlStyle, ...htmlProps }) {
    return {
      ...htmlProps,
      style: { ...htmlStyle, overflow: "hidden", position: "relative" },
    };
  },
});

export const Progress = createComponent({
  as: "div",
  memo: true,
  useHook: useProgress,
});
