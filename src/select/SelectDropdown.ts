/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { usePopover } from "reakit";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./useSelectState";
import { SELECT_KEYS, POPOVER_KEYS } from "./__keys";
import { createComponent, createHook } from "reakit-system";
import { CompositeProps, useComposite } from "reakit/Composite";
import { usePortalShortcut } from "./common";
import { useForkRef } from "reakit-utils";

export type SelectDropdownOptions = CompositeProps &
  Pick<
    SelectStateReturn,
    "setSelected" | "visible" | "values" | "currentId" | "move"
  > & {
    maxHeight?: string | number;
    modal?: boolean;
  };

const useSelectDropdown = createHook<SelectDropdownOptions, BoxHTMLProps>({
  name: "selectDropdown",
  compose: [useComposite, usePopover],
  keys: ["maxHeight", ...SELECT_KEYS, ...POPOVER_KEYS],
  useOptions({ modal = false, ...options }) {
    return { modal, ...options };
  },

  useProps(
    { maxHeight = 500, visible, move, values, currentId },
    { ref: htmlRef, style: htmlStyle, ...htmlProps },
  ) {
    const ref = React.useRef<HTMLElement>(null);

    usePortalShortcut(ref, { values, currentId, move });

    React.useEffect(() => {
      if (values) {
        const selectedValue = values[0];
        selectedValue && move?.(selectedValue.id);
      }
    }, [visible]);

    return {
      ref: useForkRef(ref, htmlRef),
      role: "listbox",
      "aria-orientation": "vertical",
      "aria-hidden": !visible,
      style: {
        maxHeight: maxHeight,
        overflowY: "scroll",
        ...htmlStyle,
      },
      ...htmlProps,
    };
  },
});

export const SelectDropdown = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectDropdown,
});
