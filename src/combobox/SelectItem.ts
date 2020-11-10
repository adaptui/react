import {
  BoxOptions,
  BoxHTMLProps,
  useBox,
  CompositeItemOptions,
  CompositeItemHTMLProps,
  useCompositeItem,
} from "reakit";
import * as React from "react";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";

import { Item } from "./helpers/types";
import { SELECT_ITEM_KEYS } from "./__keys";
import { getItemId } from "./helpers/getItemId";
import { SelectStateReturn } from "./SelectState";

export const useSelectItem = createHook<SelectItemOptions, SelectItemHTMLProps>(
  {
    name: "SelectItem",
    compose: useBox,
    keys: SELECT_ITEM_KEYS,

    useOptions(options) {
      const trulyDisabled = options.disabled && !options.focusable;
      const value = trulyDisabled ? undefined : options.value;

      const registerItem = React.useCallback(
        (item: Item) => {
          if (options.visible) {
            options.registerItem?.({ ...item, value });
          }
        },
        [options.registerItem, options.visible, value],
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
          options.setValue?.(options.value);
          options.hide?.();
        },
        [options.hide, options.value, options.setValue],
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

export type SelectItemOptions = BoxOptions &
  CompositeItemOptions &
  Pick<Partial<SelectStateReturn>, "setValue" | "hide" | "visible"> &
  Pick<SelectStateReturn, "registerItem"> & {
    /**
     * Item's value that will be used to fill input value and filter `matches`
     * based on the input value. You can omit this for items that perform
     * actions other than filling a form. For example, items may open a dialog.
     */
    value?: string;
  };

export type SelectItemHTMLProps = BoxHTMLProps & CompositeItemHTMLProps;

export type SelectItemProps = SelectItemOptions & SelectItemHTMLProps;
