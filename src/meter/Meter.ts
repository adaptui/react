import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createHook, createComponent } from "reakit-system";

import { METER_KEYS } from "./__keys";
import { MeterStateReturn } from "./MeterState";

export type MeterOptions = BoxOptions &
  Pick<MeterStateReturn, "value" | "max" | "min" | "ariaValueText">;

export type MeterHTMLProps = BoxHTMLProps;

export type MeterProps = MeterOptions & MeterHTMLProps;

const useMeter = createHook<MeterOptions, MeterHTMLProps>({
  name: "Meter",
  compose: useBox,
  keys: METER_KEYS,

  useProps(options, htmlProps) {
    const { value, max, min, ariaValueText } = options;
    console.log("%c ariaValueText", "color: #99adcc", ariaValueText);

    // Use the meter role if available, but fall back to progressbar if not
    // Chrome currently falls back from meter automatically, and Firefox
    // does not support meter at all. Safari 13+ seems to support meter properly.
    // https://bugs.chromium.org/p/chromium/issues/detail?id=944542
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1460378
    // @see https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/meter/src/useMeter.ts
    return {
      role: "meter progressbar",
      "aria-valuemax": max,
      "aria-valuemin": min,
      "aria-valuenow": value == null ? undefined : value,
      "aria-valuetext": `${ariaValueText}`,
      ...htmlProps,
    };
  },
});

export const Meter = createComponent({
  as: "div",
  memo: true,
  useHook: useMeter,
});
