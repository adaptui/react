import { createHook, createComponent } from "reakit-system";

import { useProgress, ProgressOptions, ProgressHTMLProps } from "../progress";

export type MeterOptions = ProgressOptions;

export type MeterHTMLProps = ProgressHTMLProps;

export type MeterProps = MeterOptions & MeterHTMLProps;

const useMeter = createHook<MeterOptions, MeterHTMLProps>({
  name: "Meter",
  compose: useProgress,

  useProps(_, htmlProps) {
    // Use the meter role if available, but fall back to progressbar if not
    // Chrome currently falls back from meter automatically, and Firefox
    // does not support meter at all. Safari 13+ seems to support meter properly.
    // https://bugs.chromium.org/p/chromium/issues/detail?id=944542
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1460378
    // @see https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/meter/src/useMeter.ts
    return { role: "meter progressbar", ...htmlProps };
  },
});

export const Meter = createComponent({
  as: "div",
  memo: true,
  useHook: useMeter,
});
