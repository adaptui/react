import {
  useCompositeItem,
  CompositeItemHTMLProps,
  CompositeItemOptions,
} from "reakit/Composite";
import { SELECT_KEYS } from "./__keys";
import { SelectStateReturn } from "./useSelectState";
import { createHook, createComponent } from "reakit-system";

export type SelectItemOptions = CompositeItemOptions &
  Pick<SelectStateReturn, "setSelected" | "selected"> & {
    value: string;
  };

export type SelectItemHTMLProp = CompositeItemHTMLProps;

const useSelectItem = createHook<SelectItemOptions, SelectItemHTMLProp>({
  name: "selectItem",
  compose: useCompositeItem,
  keys: ["value", ...SELECT_KEYS],
  useProps({ selected, value, setSelected }, { ref: htmlRef, ...htmlProps }) {
    return {
      role: "option",
      "aria-label": value,
      "data-selected": selected.includes(value),
      "data-value": value,
      onClick: () => {
        setSelected(value);
      },
      ...htmlProps,
    };
  },
});

export const SelectItem = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectItem,
});
