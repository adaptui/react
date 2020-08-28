/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { usePopover } from "reakit";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./SelectState";
import { SELECT_KEYS } from "./__keys";
import { createComponent, createHook } from "reakit-system";
import { CompositeProps, useComposite } from "reakit/Composite";
import { usePortalShortcut } from "./__utils";
import { useForkRef } from "reakit-utils";

export type SelectMenuOptions = CompositeProps &
  Pick<
    SelectStateReturn,
    "setSelected" | "visible" | "values" | "currentId" | "move"
  > & {
    maxHeight?: string | number;
    modal?: boolean;
  };

const useSelectMenu = createHook<SelectMenuOptions, BoxHTMLProps>({
  name: "SelectMenu",
  compose: [useComposite, usePopover],
  keys: ["maxHeight", ...SELECT_KEYS],
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
        const firstItem = values[0];
        firstItem && move?.(firstItem.id);
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

export const SelectMenu = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectMenu,
});
