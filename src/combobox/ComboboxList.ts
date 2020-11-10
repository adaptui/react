import { useWarning } from "reakit-warning";
import { createHook } from "reakit-system/createHook";
import { BoxOptions, BoxHTMLProps, useBox } from "reakit";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";

import { COMBOBOX_LIST_KEYS } from "./__keys";
import { getMenuId } from "./helpers/getMenuId";
import { ComboboxStateReturn } from "./ComboboxState";

export const useComboboxList = createHook<
  ComboboxListOptions,
  ComboboxListHTMLProps
>({
  name: "ComboboxList",
  compose: useBox,
  keys: COMBOBOX_LIST_KEYS,

  useOptions({ menuRole = "listbox", ...options }) {
    return { menuRole, ...options };
  },

  useProps(options, htmlProps) {
    return {
      role: options.menuRole,
      id: getMenuId(options.baseId),
      ...htmlProps,
    };
  },
});

export const ComboboxList = createComponent({
  as: "div",
  useHook: useComboboxList,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/combobox",
    );
    return useCreateElement(type, props, children);
  },
});

export type ComboboxListOptions = BoxOptions &
  Pick<Partial<ComboboxStateReturn>, "menuRole"> &
  Pick<ComboboxStateReturn, "baseId">;

export type ComboboxListHTMLProps = BoxHTMLProps;

export type ComboboxListProps = ComboboxListOptions & ComboboxListHTMLProps;
