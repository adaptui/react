import { SELECT_KEYS } from "./__keys";
import {
  useCompositeItem,
  CompositeItemHTMLProps,
  CompositeItemOptions,
} from "reakit/Composite";
import { createHook, createComponent } from "reakit-system";
import { SelectStateReturn } from "./useSelectState";

export type SelectItemOptions = CompositeItemOptions &
  Pick<SelectStateReturn, "setSelected" | "selected"> & {
    value: string;
  };

export type SelectItemHTMLProp = CompositeItemHTMLProps;

const useSelectItem = createHook<SelectItemOptions, SelectItemHTMLProp>({
  name: "selectItem",
  compose: useCompositeItem,
  keys: ["setSelected", "selected", "value", ...SELECT_KEYS],
  useProps({ setSelected, selected, value }, { ref: htmlRef, ...htmlProps }) {
    return {
      role: "option",
      "aria-label": value,
      "aria-selected": selected.includes(value),
      "data-value": value,
      onClick: () => {
        setSelected(value);
      },
      ...htmlProps,
    };
  },
});

const SelectItem = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectItem,
});

export { SelectItem };
