import { useWarning } from "reakit-warning";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { createHook, createComponent, useCreateElement } from "reakit-system";

import { METER_KEYS } from "./__keys";
import { MeterStateReturn } from "./MeterState";

export type MeterOptions = RoleOptions &
  Pick<MeterStateReturn, "value" | "max" | "min" | "percent">;

export type MeterHTMLProps = RoleHTMLProps;

export type MeterProps = MeterOptions & MeterHTMLProps;

const useMeter = createHook<MeterOptions, MeterHTMLProps>({
  name: "Meter",
  compose: useRole,
  keys: METER_KEYS,

  useProps(options, htmlProps) {
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
      "aria-valuenow": value,
      "aria-valuetext": !percent.toString() ? undefined : `${percent}%`,
      ...htmlProps,
    };
  },
});

export const Meter = createComponent({
  as: "div",
  memo: true,
  useHook: useMeter,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
    );
    return useCreateElement(type, props, children);
  },
});
