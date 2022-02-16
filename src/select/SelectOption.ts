import { createComponent, createHook } from "../system";

import { SELECT_OPTION_KEYS } from "./__keys";
import {
  SelectItemHTMLProps,
  SelectItemOptions,
  useSelectItem,
} from "./SelectItem";

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
