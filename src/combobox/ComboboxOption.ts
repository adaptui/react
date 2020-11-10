import {
  CompositeItemOptions,
  CompositeItemHTMLProps,
  useCompositeItem,
} from "reakit";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";

import { COMBOBOX_OPTION_KEYS } from "./__keys";
import {
  ComboboxItemOptions,
  ComboboxItemHTMLProps,
  useComboboxItem,
} from "./ComboboxItem";

export const useComboboxOption = createHook<
  ComboboxOptionOptions,
  ComboboxOptionHTMLProps
>({
  name: "ComboboxOption",
  compose: [useComboboxItem, useCompositeItem],
  keys: COMBOBOX_OPTION_KEYS,

  useProps(_, htmlProps) {
    return { role: "option", ...htmlProps };
  },
});

export const ComboboxOption = createComponent({
  as: "div",
  memo: true,
  useHook: useComboboxOption,
});

export type ComboboxOptionOptions = CompositeItemOptions & ComboboxItemOptions;

export type ComboboxOptionHTMLProps = CompositeItemHTMLProps &
  ComboboxItemHTMLProps;

export type ComboboxOptionProps = ComboboxOptionOptions &
  ComboboxOptionHTMLProps;
