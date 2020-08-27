import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./useSelectState";
import { createHook, createComponent } from "reakit-system";
import { SELECT_KEYS } from "./__keys";
import { usePopoverDisclosure } from "reakit";
import { useTypeahead } from "./common";

export type SelectTriggerOptions = Pick<
  SelectStateReturn,
  "visible" | "unstable_referenceRef" | "setTypehead"
>;

const useSelectTrigger = createHook<SelectTriggerOptions, BoxHTMLProps>({
  name: "selectTrigger",
  compose: [usePopoverDisclosure],
  keys: SELECT_KEYS,

  useProps({ visible, setTypehead }, { ref: htmlRef, ...htmlProps }) {
    const { handleOnKeyPress } = useTypeahead({ setTypehead });

    return {
      tabIndex: 0,
      role: "button",
      "aria-haspopup": "listbox",
      "aria-expanded": visible,
      onKeyPress: handleOnKeyPress,
      ...htmlProps,
    };
  },
});

export const SelectTrigger = createComponent({
  as: "div",
  useHook: useSelectTrigger,
});
