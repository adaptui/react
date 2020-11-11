import * as React from "react";
import { useForkRef } from "reakit-utils";
import { useWarning } from "reakit-warning";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { PopoverOptions, PopoverHTMLProps, usePopover } from "reakit";

import {
  SelectListOptions,
  SelectListHTMLProps,
  useSelectList,
} from "./SelectList";
import { SELECT_POPOVER_KEYS } from "./__keys";
import { SelectStateReturn } from "./SelectState";
import { useTypeaheadShortcut } from "./helpers/useTypeaheadShortcut";

export const useSelectPopover = createHook<
  SelectPopoverOptions,
  SelectPopoverHTMLProps
>({
  name: "SelectPopover",
  compose: [useSelectList, usePopover],
  keys: SELECT_POPOVER_KEYS,

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);

    useTypeaheadShortcut({ options, ref });

    return {
      ref: useForkRef(ref, htmlRef),
      role: "listbox",
      ...htmlProps,
    };
  },
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
  PopoverOptions &
  Pick<SelectStateReturn, "values" | "currentValue" | "valuesById">;

export type SelectPopoverHTMLProps = PopoverHTMLProps & SelectListHTMLProps;

export type SelectPopoverProps = SelectPopoverOptions & SelectPopoverHTMLProps;
