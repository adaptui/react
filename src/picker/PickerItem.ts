import { createHook, createComponent } from "reakit-system";
import { useCompositeItem } from "reakit";
import { PICKER_STATE_KEYS } from "./__keys";

const usePickerItem = createHook<{}, {}>({
  name: "usePickerItem",
  compose: [useCompositeItem],
  keys: PICKER_STATE_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const PickerItem = createComponent({
  as: "div",
  memo: true,
  useHook: usePickerItem,
});
