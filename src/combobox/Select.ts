import {
  PopoverDisclosureHTMLProps,
  PopoverDisclosureOptions,
  usePopoverDisclosure,
} from "reakit";
import * as React from "react";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { createComponent, createHook } from "reakit-system";

import { SELECT_KEYS } from "./__keys";
import { SelectStateReturn } from "./SelectState";
import { useShortcut } from "@chakra-ui/hooks";
import { callAllHandlers, getNextItemFromSearch } from "@chakra-ui/utils";

export const useSelect = createHook<SelectOptions, SelectHTMLProps>({
  name: "Select",
  compose: usePopoverDisclosure,
  keys: SELECT_KEYS,

  useOptions({ menuRole = "listbox", hideOnEsc = true, ...options }) {
    return { menuRole, hideOnEsc, ...options };
  },

  useProps(options, { onKeyDown: htmlOnKeyDown, ...htmlProps }) {
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        onKeyDownRef.current?.(event);
        if (event.defaultPrevented) return;

        // setTimeout prevents scroll jump
        // and the internals to get the disclosure ref properly
        const first = () => {
          if (!options.visible) options.show?.();
          if (!options.selectedValue)
            options.first && setTimeout(options.first);
        };
        const last = () => {
          if (!options.visible) options.show?.();
          if (!options.selectedValue) options.last && setTimeout(options.last);
        };

        const keyMap = {
          Enter: first,
          " ": first,
          ArrowUp: last,
          ArrowDown: first,
        };

        const action = keyMap[event.key as keyof typeof keyMap];
        if (action) action();
      },
      [
        options.visible,
        options.show,
        options.last,
        options.first,
        options.selectedValue,
      ],
    );

    // Reference:
    // https://github.com/chakra-ui/chakra-ui/blob/83eec5b140bd9a69821d8e4df3e69bff0768dcca/packages/menu/src/use-menu.ts#L228-L253
    const onCharacterPress = useShortcut({
      preventDefault: event => event.key !== " ",
    });

    return {
      "aria-haspopup": options.menuRole,
      onKeyDown: callAllHandlers(
        onCharacterPress(character => {
          /**
           * Typeahead: Based on current character pressed,
           * find the next item to be selected
           */
          const selectedValue = options.values.find(value =>
            options.selectedValue?.includes(value),
          );

          const nextItem = getNextItemFromSearch(
            options.values,
            character,
            item => item ?? "",
            selectedValue,
          );

          if (nextItem) {
            options.setSelectedValue(nextItem);
          }
        }),
        onKeyDown,
      ),
      ...htmlProps,
    };
  },
});

export const Select = createComponent({
  as: "button",
  memo: true,
  useHook: useSelect,
});

export type SelectOptions = PopoverDisclosureOptions &
  SelectStateReturn & {
    /**
     * When enabled, user can hide the select popover by pressing
     * `esc` while focusing on the select input.
     * @default true
     */
    hideOnEsc?: boolean;
  };

export type SelectHTMLProps = PopoverDisclosureHTMLProps;

export type SelectProps = SelectOptions & SelectHTMLProps;
