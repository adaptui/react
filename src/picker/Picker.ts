import { PICKER_STATE_KEYS } from "./__keys";
import { createHook, createComponent } from "reakit-system";

const usePicker = createHook<{}, {}>({
  name: "usePicker",
  compose: [],
  keys: PICKER_STATE_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const Picker = createComponent({
  as: "div",
  memo: true,
  useHook: usePicker,
});
