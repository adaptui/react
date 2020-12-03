import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";

import {
  useSelectItem,
  SelectItemOptions,
  SelectItemHTMLProps,
} from "./SelectItem";
import { SELECT_OPTION_KEYS } from "./__keys";

export const useSelectOption = createHook<
  SelectOptionOptions,
  SelectOptionHTMLProps
>({
  name: "SelectOption",
  compose: useSelectItem,
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

export type SelectOptionOptions = SelectItemOptions;

export type SelectOptionHTMLProps = SelectItemHTMLProps;

export type SelectOptionProps = SelectOptionOptions & SelectOptionHTMLProps;
