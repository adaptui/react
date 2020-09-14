/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useForkRef } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import { usePopover, PopoverHTMLProps, PopoverProps } from "reakit";
import {
  useComposite,
  CompositeProps,
  CompositeHTMLProps,
} from "reakit/Composite";

import { SELECT_KEYS } from "./__keys";
import { usePortalShortcut } from "./__utils";
import { SelectStateReturn } from "./SelectState";

export type SelectMenuOptions = CompositeProps &
  PopoverProps &
  Pick<
    SelectStateReturn,
    | "setSelected"
    | "visible"
    | "values"
    | "currentId"
    | "move"
    | "selected"
    | "isCombobox"
  >;

export type SelectMenuHTMLProps = CompositeHTMLProps & PopoverHTMLProps;

const useSelectMenu = createHook<SelectMenuOptions, SelectMenuHTMLProps>({
  name: "SelectMenu",
  compose: [useComposite, usePopover],
  keys: SELECT_KEYS,

  useProps(
    { visible, move, values, currentId, selected, isCombobox },
    { ref: htmlRef, ...htmlProps },
  ) {
    const ref = React.useRef<HTMLElement>(null);

    usePortalShortcut({
      ref,
      options: { values, currentId, move },
      disable: isCombobox,
    });

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
