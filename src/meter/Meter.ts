import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createHook, createComponent } from "reakit-system";

import { METER_KEYS } from "./__key";
import { MeterStateReturn } from "./MeterState";
import { isFunction } from "@chakra-ui/utils";

export type MeterOptions = BoxOptions &
  Pick<MeterStateReturn, "value" | "max" | "min" | "percent"> & {
    /**
     * Function that returns the `aria-valuetext` for screen readers.
     * It's mostly used to generate a more human-readable
     * representation of the value for assistive technologies
     */
    getAriaValueText?(value: number): string;
  };

export type MeterHTMLProps = BoxHTMLProps;

export type MeterProps = MeterOptions & MeterHTMLProps;

const useMeter = createHook<MeterOptions, MeterHTMLProps>({
  name: "Meter",
  compose: useBox,
  keys: METER_KEYS,

  useProps(options, { "aria-valuetext": ariaValueText, ...htmlProps }) {
    const { value, max, min, percent } = options;
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
      "aria-valuetext":
        value == null
          ? undefined
          : isFunction(options.getAriaValueText)
          ? options.getAriaValueText(value)
          : ariaValueText ?? `${String(percent)}%`,
      ...htmlProps,
    };
  },
});

export const Meter = createComponent({
  as: "div",
  memo: true,
  useHook: useMeter,
});
