import {
  CompositeItemOptions,
  CompositeItemHTMLProps,
  useCompositeItem,
} from "reakit";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";

import { SELECT_OPTION_KEYS } from "./__keys";
import {
  SelectItemOptions,
  SelectItemHTMLProps,
  useSelectItem,
} from "./SelectItem";

export const useSelectOption = createHook<
  SelectOptionOptions,
  SelectOptionHTMLProps
>({
  name: "SelectOption",
  compose: [useSelectItem],
  keys: SELECT_OPTION_KEYS,

  useProps(_, htmlProps) {
    return { role: "option", ...htmlProps };
  },
});

export const SelectOption = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectOption,
});

export type SelectOptionOptions = CompositeItemOptions & SelectItemOptions;

export type SelectOptionHTMLProps = CompositeItemHTMLProps &
  SelectItemHTMLProps;

export type SelectOptionProps = SelectOptionOptions & SelectOptionHTMLProps;
