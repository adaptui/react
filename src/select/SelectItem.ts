/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {
  CompositeItemHTMLProps,
  CompositeItemOptions,
  useCompositeItem,
} from "reakit";
import { useLiveRef } from "reakit-utils/useLiveRef";

import { createComponent, createHook } from "../system";

import { Item } from "./helpers/types";
import { SELECT_ITEM_KEYS } from "./__keys";
import { getItemId } from "./helpers";
import { SelectStateReturn } from "./SelectState";

export const useSelectItem = createHook<SelectItemOptions, SelectItemHTMLProps>(
  {
    name: "SelectItem",
    compose: useCompositeItem,
    keys: SELECT_ITEM_KEYS,

    useOptions(options) {
      const registerItem = React.useCallback(
        (item: Item) => {
          options.registerItem?.({ ...item, value: options.value });
        },
        [options.registerItem, options.value],
      );

      if (options.id || !options.baseId || !options.value) {
        return { ...options, registerItem };
      }

      const id = getItemId(options.baseId, options.value, options.id);
      return { ...options, registerItem, id };
    },

    useProps(options, { onClick: htmlOnClick, ...htmlProps }) {
      const onClickRef = useLiveRef(htmlOnClick);

      const onClick = React.useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
          onClickRef.current?.(event);
          if (event.defaultPrevented) return;
          if (!options.value) return;

          options.setSelectedValue?.(options.value);
          options.hide?.();
        },
        [options.hide, options.value, options.setSelectedValue],
      );

      return {
        children: options.value,
        onClick,
        ...htmlProps,
      };
    },
  },
);

export const SelectItem = createComponent({
  as: "span",
  memo: true,
  useHook: useSelectItem,
});

export type SelectItemOptions = CompositeItemOptions &
  Pick<Partial<SelectStateReturn>, "setSelectedValue" | "hide" | "visible"> &
  Pick<SelectStateReturn, "registerItem"> & {
    /**
     * Item's value that will be used to fill input value and filter `matches`
     * based on the input value. You can omit this for items that perform
     * actions other than filling a form. For example, items may open a dialog.
     */
    value?: string;
  };

export type SelectItemHTMLProps = CompositeItemHTMLProps;

export type SelectItemProps = SelectItemOptions & SelectItemHTMLProps;
