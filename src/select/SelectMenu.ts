/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { usePopover, PopoverHTMLProps } from "reakit";
import { SelectStateReturn } from "./SelectState";
import { SELECT_KEYS } from "./__keys";
import { createComponent, createHook } from "reakit-system";
import {
  useComposite,
  CompositeProps,
  CompositeHTMLProps,
} from "reakit/Composite";
import { usePortalShortcut } from "./__utils";
import { useForkRef } from "reakit-utils";

export type SelectMenuOptions = CompositeProps &
  Pick<
    SelectStateReturn,
    "setSelected" | "visible" | "values" | "currentId" | "move"
  > & {
    modal?: boolean;
  };

export type SelectMenuHTMLProps = CompositeHTMLProps & PopoverHTMLProps;

const useSelectMenu = createHook<SelectMenuOptions, SelectMenuHTMLProps>({
  name: "SelectMenu",
  compose: [useComposite, usePopover],
  keys: SELECT_KEYS,
  useOptions({ modal = false, ...options }) {
    return { modal, ...options };
  },

  useProps(
    { visible, move, values, currentId },
    { ref: htmlRef, style: htmlStyle, ...htmlProps },
  ) {
    const ref = React.useRef<HTMLElement>(null);

    usePortalShortcut(ref, { values, currentId, move });

    React.useEffect(() => {
      if (values) {
        const firstItem = values[0];
        firstItem && move?.(firstItem.id);
      }
    }, [visible]);

    return {
      ref: useForkRef(ref, htmlRef),
      role: "listbox",
      style: htmlStyle,
      ...htmlProps,
    };
  },
});

export const SelectMenu = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectMenu,
});
