import { useWarning } from "reakit-warning";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { CompositeOptions, CompositeHTMLProps, useComposite } from "reakit";

import { SELECT_LIST_KEYS } from "./__keys";
import { SelectStateReturn } from "./SelectState";

export const useSelectList = createHook<SelectListOptions, SelectListHTMLProps>(
  {
    name: "SelectList",
    compose: useComposite,
    keys: SELECT_LIST_KEYS,

    useOptions({ menuRole = "listbox", ...options }) {
      return { menuRole, ...options };
    },

    useProps(options, htmlProps) {
      return {
        role: options.menuRole,
        ...htmlProps,
      };
    },
  },
);

export const SelectList = createComponent({
  as: "div",
  useHook: useSelectList,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://www.w3.org/TR/wai-aria-1.1/#listbox",
    );
    return useCreateElement(type, props, children);
  },
});

export type SelectListOptions = CompositeOptions &
  Pick<Partial<SelectStateReturn>, "menuRole"> &
  Pick<SelectStateReturn, "baseId">;

export type SelectListHTMLProps = CompositeHTMLProps;

export type SelectListProps = SelectListOptions & SelectListHTMLProps;
