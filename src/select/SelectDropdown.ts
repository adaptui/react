/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { usePopover } from "reakit";
import debounce from "lodash.debounce";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./useSelectState";
import { SELECT_KEYS, POPOVER_KEYS } from "./__keys";
import { createComponent, createHook } from "reakit-system";
import { CompositeProps, useComposite } from "reakit/Composite";
import { useTypeahead } from "./common";

export type SelectDropdownOptions = CompositeProps &
  Pick<
    SelectStateReturn,
    | "selected"
    | "setSelected"
    | "typehead"
    | "visible"
    | "setTypehead"
    | "isCombobox"
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
    {
      maxHeight = 500,
      items,
      selected,
      typehead,
      visible,
      isCombobox,
      move,
      setSelected,
      setCurrentId,
      setTypehead,
    },
    { ref: htmlRef, style: htmlStyle, ...htmlProps },
  ) {
    const { handleOnKeyPress } = useTypeahead({
      setTypehead,
      disabled: isCombobox,
    });

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

    React.useEffect(() => {
      debounce(
        () => {
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
              move(item.id);
              // if dropdown is not open directly select the item.
              if (!visible) {
                // remain dropdown open on setSelected
                setSelected(dataAttrValue, true);
              }
            }
          });
        },
        visible ? 150 : 400,
      )();
    }, [typehead, visible]);

    return {
      role: "listbox",
      "aria-orientation": "vertical",
      "aria-hidden": !visible,
      style: {
        maxHeight: maxHeight,
        overflowY: "scroll",
        ...htmlStyle,
      },
      onKeyDown: handleOnKeyPress,
      ...htmlProps,
    };
  },
});

export const SelectDropdown = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectDropdown,
});
