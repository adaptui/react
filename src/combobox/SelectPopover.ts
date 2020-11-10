import { useWarning } from "reakit-warning";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { PopoverOptions, PopoverHTMLProps, usePopover } from "reakit";

import { SELECT_POPOVER_KEYS } from "./__keys";
import {
  SelectListOptions,
  SelectListHTMLProps,
  useSelectList,
} from "./SelectList";
import { SelectPopoverStateReturn } from "./SelectPopoverState";

export const useSelectPopover = createHook<
  SelectPopoverOptions,
  SelectPopoverHTMLProps
>({
  name: "SelectPopover",
  compose: [useSelectList, usePopover],
  keys: SELECT_POPOVER_KEYS,
});

export const SelectPopover = createComponent({
  as: "div",
  useHook: useSelectPopover,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/select",
    );
    return useCreateElement(type, props, children);
  },
});

export type SelectPopoverOptions = SelectListOptions &
  Omit<
    PopoverOptions,
    | "unstable_disclosureRef"
    | "unstable_autoFocusOnHide"
    | "unstable_autoFocusOnShow"
  > &
  Pick<Partial<SelectPopoverStateReturn>, "unstable_referenceRef">;

export type SelectPopoverHTMLProps = PopoverHTMLProps & SelectListHTMLProps;

export type SelectPopoverProps = SelectPopoverOptions & SelectPopoverHTMLProps;
