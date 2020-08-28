/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { usePopover, PopoverHTMLProps, PopoverProps } from "reakit";
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
  PopoverProps &
  Pick<
    SelectStateReturn,
    "setSelected" | "visible" | "values" | "currentId" | "move" | "selected"
  >;

export type SelectMenuHTMLProps = CompositeHTMLProps & PopoverHTMLProps;

const useSelectMenu = createHook<SelectMenuOptions, SelectMenuHTMLProps>({
  name: "SelectMenu",
  compose: [useComposite, usePopover],
  keys: SELECT_KEYS,
  useOptions({ modal = false, ...options }) {
    return { modal, ...options };
  },

  useProps(
    { visible, move, values, currentId, selected },
    { ref: htmlRef, ...htmlProps },
  ) {
    const ref = React.useRef<HTMLElement>(null);

    usePortalShortcut(ref, { values, currentId, move });

    React.useEffect(() => {
      if (values && !selected?.length) {
        const firstItem = values[0];
        firstItem && move?.(firstItem.id);
      } else {
        const lastSelected = values.find(i => {
          return i.value === selected[selected.length - 1];
        })?.id;
        move?.(lastSelected as string);
      }
    }, [visible]);

    return {
      ref: useForkRef(ref, htmlRef),
      role: "listbox",
      ...htmlProps,
    };
  },
});

export const SelectMenu = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectMenu,
});
