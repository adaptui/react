import { useWarning } from "reakit-warning";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { PopoverOptions, PopoverHTMLProps, usePopover } from "reakit";

import { COMBOBOX_POPOVER_KEYS } from "./__keys";
import {
  ComboboxListOptions,
  ComboboxListHTMLProps,
  useComboboxList,
} from "./ComboboxList";
import { ComboboxPopoverStateReturn } from "./ComboboxPopoverState";

export const useComboboxPopover = createHook<
  ComboboxPopoverOptions,
  ComboboxPopoverHTMLProps
>({
  name: "ComboboxPopover",
  compose: [useComboboxList, usePopover],
  keys: COMBOBOX_POPOVER_KEYS,

  useOptions(options) {
    return {
      ...options,
      unstable_disclosureRef: options.unstable_referenceRef,
      unstable_autoFocusOnShow: false,
      unstable_autoFocusOnHide: false,
    };
  },

  useComposeProps(options, { tabIndex, ...htmlProps }) {
    htmlProps = useComboboxList(options, htmlProps, true);
    htmlProps = usePopover(options, htmlProps, true);
    return {
      ...htmlProps,
      tabIndex: tabIndex ?? undefined,
    };
  },
});

export const ComboboxPopover = createComponent({
  as: "div",
  useHook: useComboboxPopover,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/combobox",
    );
    return useCreateElement(type, props, children);
  },
});

export type ComboboxPopoverOptions = ComboboxListOptions &
  Omit<
    PopoverOptions,
    | "unstable_disclosureRef"
    | "unstable_autoFocusOnHide"
    | "unstable_autoFocusOnShow"
  > &
  Pick<Partial<ComboboxPopoverStateReturn>, "unstable_referenceRef">;

export type ComboboxPopoverHTMLProps = PopoverHTMLProps & ComboboxListHTMLProps;

export type ComboboxPopoverProps = ComboboxPopoverOptions &
  ComboboxPopoverHTMLProps;
