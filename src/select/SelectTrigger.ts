import { useForkRef } from "reakit-utils";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./SelectState";
import { createHook, createComponent } from "reakit-system";
import { SELECT_KEYS, POPOVER_DISCLOSURE_KEYS } from "./__keys";
import { useDialogDisclosure } from "reakit";

export type SelectTriggerOptions = Pick<
  SelectStateReturn,
  "toggle" | "visible" | "unstable_referenceRef"
>;

const useSelectTrigger = createHook<SelectTriggerOptions, BoxHTMLProps>({
  name: "selectTrigger",
  compose: useDialogDisclosure,
  keys: SELECT_KEYS,

  useProps({ unstable_referenceRef, visible }, { ref: htmlRef, ...htmlProps }) {
    return {
      ref: useForkRef(unstable_referenceRef, htmlRef),
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
