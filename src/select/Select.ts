import {
  PopoverDisclosureHTMLProps,
  PopoverDisclosureOptions,
  usePopoverDisclosure,
} from "reakit";
import * as React from "react";
import { useShortcut } from "@chakra-ui/hooks";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { createComponent, createHook } from "reakit-system";
import { callAllHandlers, getNextItemFromSearch } from "@chakra-ui/utils";

import { SELECT_KEYS } from "./__keys";
import { SelectStateReturn } from "./SelectState";

export const useSelect = createHook<SelectOptions, SelectHTMLProps>({
  name: "Select",
  compose: usePopoverDisclosure,
  keys: SELECT_KEYS,

  useOptions({ menuRole = "listbox", hideOnEsc = true, ...options }) {
    return { menuRole, hideOnEsc, ...options };
  },

  useProps(options, { onKeyDown: htmlOnKeyDown, ...htmlProps }) {
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);

    // Reference:
    // https://github.com/chakra-ui/chakra-ui/blob/83eec5b140bd9a69821d8e4df3e69bff0768dcca/packages/menu/src/use-menu.ts#L228-L253
    const onCharacterPress = useShortcut({
      preventDefault: event => event.key !== " ",
    });

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        onKeyDownRef.current?.(event);
        if (event.defaultPrevented) return;

        // window.setTimeout on show prevents scroll jump on ArrowUp & ArrowDown
        const first = () => {
          if (!options.visible) options.show && window.setTimeout(options.show);
          if (!options.selectedValue) options.first?.();
        };
        const last = () => {
          if (!options.visible) options.show && window.setTimeout(options.show);
          if (!options.selectedValue) options.last?.();
        };

        const keyMap = {
          Enter: first,
          " ": first,
          ArrowUp: last,
          ArrowDown: first,
        };

        const action = keyMap[event.key as keyof typeof keyMap];
        action?.();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        options.visible,
        options.show,
        options.last,
        options.first,
        options.values,
        options.selectedValue,
        options.setSelectedValue,
      ],
    );

    return {
      "aria-haspopup": options.menuRole,
      onKeyDown: callAllHandlers(
        onKeyDown,
        onCharacterPress(handleCharacterPress(options)),
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

const handleCharacterPress = (options: SelectOptions) => (
  character: string,
) => {
  console.log(character);
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

  if (nextItem) options.setSelectedValue(nextItem);
};

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
