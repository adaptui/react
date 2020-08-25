/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDialog } from "reakit";
import debounce from "lodash.debounce";
import { useForkRef } from "reakit-utils";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./SelectState";
import { SELECT_KEYS, POPOVER_KEYS } from "./__keys";
import { createComponent, createHook } from "reakit-system";
import { useComposite, CompositeProps } from "reakit/Composite";

export type SelectDropdownOptions = CompositeProps &
  Pick<
    SelectStateReturn,
    | "selected"
    | "setSelected"
    | "typehead"
    | "visible"
    | "unstable_popoverStyles"
    | "unstable_popoverRef"
  > & {
    maxHeight?: string | number;
    modal?: boolean;
  };

const useSelectDropdown = createHook<SelectDropdownOptions, BoxHTMLProps>({
  name: "selectDropdown",
  compose: [useComposite, useDialog],
  keys: ["maxHeight", ...SELECT_KEYS, ...POPOVER_KEYS],

  useOptions({ modal = false, ...options }) {
    return { modal, ...options };
  },
  useProps(
    {
      maxHeight = 500,
      move,
      items,
      selected,
      setSelected,
      setCurrentId,
      typehead,
      visible,
      unstable_popoverStyles,
      unstable_popoverRef,
    },
    { ref: htmlRef, style: htmlStyle, ...htmlProps },
  ) {
    React.useEffect(() => {
      if (!items[0]) return;

      const selectedItem = items.filter(item => {
        if (!item.ref.current) return false;
        return selected.includes(
          item.ref.current.getAttribute("data-value") as string,
        );
      });

      if (selectedItem.length > 0) {
        setCurrentId(selectedItem[0].id);
        move(selectedItem[0].id);
      } else {
        setCurrentId(items[0].id);
        move(items[0].id);
      }
    }, [visible]);

    React.useEffect(
      debounce(() => {
        if (typehead === "") return;

        items.forEach(item => {
          if (!item.ref.current) return;
          const dataAttrValue = item.ref.current.getAttribute(
            "data-value",
          ) as string;

          if (
            !selected.includes(dataAttrValue) &&
            dataAttrValue.startsWith(typehead)
          ) {
            setCurrentId(item.id);
            // remain dropdown open on setSelected
            setSelected(dataAttrValue, true);
            move(item.id);
          }
        });
      }, 400),
      [typehead],
    );

    return {
      tabIndex: -1,
      role: "listbox",
      "aria-orientation": "vertical",
      "aria-hidden": !visible,
      ref: useForkRef(unstable_popoverRef, htmlRef),
      style: {
        maxHeight: maxHeight,
        overflowY: "scroll",
        ...unstable_popoverStyles,
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
