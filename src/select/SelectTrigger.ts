import { useForkRef } from "reakit-utils";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./useSelectState";
import { createHook, createComponent } from "reakit-system";
import { SELECT_KEYS } from "./__keys";
import { useComposite, usePopoverDisclosure } from "reakit";

export type SelectTriggerOptions = Pick<
  SelectStateReturn,
  "toggle" | "visible" | "unstable_referenceRef"
>;

const useSelectTrigger = createHook<SelectTriggerOptions, BoxHTMLProps>({
  name: "selectTrigger",
  compose: [useComposite, usePopoverDisclosure],
  keys: SELECT_KEYS,

  useProps({ visible }, { ref: htmlRef, ...htmlProps }) {
    return {
      role: "button",
      "aria-haspopup": "listbox",
      "aria-expanded": visible,
      tabIndex: 0,
      ...htmlProps,
    };
  },
});

export const SelectTrigger = createComponent({
  as: "div",
  useHook: useSelectTrigger,
});
