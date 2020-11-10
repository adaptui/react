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
import { COMBOBOX_ITEM_KEYS } from "./__keys";
import { getItemId } from "./helpers/getItemId";
import { ComboboxStateReturn } from "./ComboboxState";

export const useComboboxItem = createHook<
  ComboboxItemOptions,
  ComboboxItemHTMLProps
>({
  name: "ComboboxItem",
  compose: useBox,
  keys: COMBOBOX_ITEM_KEYS,

  propsAreEqual(prev, next) {
    if (prev.value !== next.value) return false;
    if (!prev.value || !next.value || !prev.baseId || !next.baseId) {
      return useCompositeItem.unstable_propsAreEqual(prev, next);
    }
    const {
      currentValue: prevCurrentValue,
      inputValue: prevInputValue,
      // @ts-ignore
      matches: prevMatches,
      ...prevProps
    } = prev;
    const {
      currentValue: nextCurrentValue,
      inputValue: nextInputValue,
      // @ts-ignore
      matches: nextMatches,
      ...nextProps
    } = next;
    if (prevCurrentValue !== nextCurrentValue) {
      if (next.value === prevCurrentValue || next.value === nextCurrentValue) {
        return false;
      }
    }
    const prevId = getItemId(prev.baseId, prev.value, prev.id);
    const nextId = getItemId(next.baseId, next.value, prev.id);
    return useCompositeItem.unstable_propsAreEqual(
      { ...prevProps, id: prevId },
      { ...nextProps, id: nextId },
    );
  },

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
        options.hide?.();
        options.setInputValue?.(options.value);
      },
      [options.hide, options.setInputValue, options.value],
    );

    return {
      children: options.value,
      onClick,
      tabIndex: -1,
      ...htmlProps,
    };
  },
});

export const ComboboxItem = createComponent({
  as: "span",
  memo: true,
  useHook: useComboboxItem,
});

export type ComboboxItemOptions = BoxOptions &
  CompositeItemOptions &
  Pick<
    Partial<ComboboxStateReturn>,
    "currentValue" | "inputValue" | "hide" | "visible"
  > &
  Pick<ComboboxStateReturn, "setInputValue" | "registerItem"> & {
    /**
     * Item's value that will be used to fill input value and filter `matches`
     * based on the input value. You can omit this for items that perform
     * actions other than filling a form. For example, items may open a dialog.
     */
    value?: string;
  };

export type ComboboxItemHTMLProps = BoxHTMLProps & CompositeItemHTMLProps;

export type ComboboxItemProps = ComboboxItemOptions & ComboboxItemHTMLProps;
