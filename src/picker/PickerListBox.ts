import { createHook, createComponent } from "reakit-system";
import { useComposite, usePopover } from "reakit";
import { PICKER_STATE_KEYS } from "./__keys";

const usePickerListBox = createHook<{}, {}>({
  name: "usePickerListBox",
  compose: [usePopover, useComposite],
  keys: PICKER_STATE_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const PickerListBox = createComponent({
  as: "div",
  memo: true,
  useHook: usePickerListBox,
});
