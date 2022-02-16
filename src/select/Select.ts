import * as React from "react";
import {
  PopoverDisclosureHTMLProps,
  PopoverDisclosureOptions,
  usePopoverDisclosure,
} from "reakit";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { useShortcut } from "@chakra-ui/hooks";
import { callAllHandlers, getNextItemFromSearch } from "@chakra-ui/utils";

import { createComponent, createHook } from "../system";

import { SELECT_KEYS } from "./__keys";
import { SelectStateReturn } from "./SelectState";

export const useSelect = createHook<SelectOptions, SelectHTMLProps>({
  name: "Select",
  compose: usePopoverDisclosure,
  keys: SELECT_KEYS,

  useOptions({ menuRole = "listbox", hideOnEsc = true, ...options }) {
    return { menuRole, hideOnEsc, ...options };
  },

  useProps(
    options,
    {
      onClick: htmlOnClick,
      onKeyDown: htmlOnKeyDown,
      onMouseDown: htmlOnMouseDown,
      ...htmlProps
    },
  ) {
    const disabled = options.disabled || htmlProps["aria-disabled"];
    const hasPressedMouse = React.useRef(false);

    const onKeyDownRef = useLiveRef(htmlOnKeyDown);
    const onClickRef = useLiveRef(htmlOnClick);
    const onMouseDownRef = useLiveRef(htmlOnMouseDown);

    // Reference:
    // https://github.com/chakra-ui/chakra-ui/blob/83eec5b140bd9a69821d8e4df3e69bff0768dcca/packages/menu/src/use-menu.ts#L228-L253
    const onCharacterPress = useShortcut({
      preventDefault: event => event.key !== " ",
    });

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        onKeyDownRef.current?.(event);
        if (event.defaultPrevented) return;

        if (event.key === "Escape") {
          // Doesn't prevent default on Escape, otherwise we can't close
          // dialogs when MenuButton is focused
          options.hide?.();
        } else if (!disabled) {
          const keyMap = {
            Enter: options.first,
            " ": options.first,
            ArrowUp: options.last,
            ArrowDown: options.first,
          };

          const action = keyMap[event.key as keyof typeof keyMap];
          if (action) {
            event.preventDefault();
            event.stopPropagation();

            // setTimeout prevents scroll jump
            options.show && setTimeout(options.show);
            if (!options.selectedValue) action();
            return;
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        disabled,
        options.show,
        options.hide,
        options.first,
        options.last,
        options.selectedValue,
      ],
    );

    const onMouseDown = React.useCallback((event: React.MouseEvent) => {
      // If the Select has been clicked using mouse or keyboard. On mouse click,
      // we don't automatically focus the first menu item.
      hasPressedMouse.current = true;
      onMouseDownRef.current?.(event);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClick = React.useCallback(
      (event: React.MouseEvent) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;

        options.toggle?.();

        // Focus the SelectPopover when it's opened with mouse click.
        if (hasPressedMouse.current && !options.visible) {
          options.move?.(null);
        }
        hasPressedMouse.current = false;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [options.show, options.toggle, options.visible, options.move],
    );

    return {
      "aria-haspopup": options.menuRole,
      onClick,
      onMouseDown,
      onKeyDown: callAllHandlers(
        onKeyDown,
        onCharacterPress(handleCharacterPress(options)),
      ),
      ...htmlProps,
    };
  },

  useComposeOptions(options) {
    return {
      ...options,
      // Toggling is handled by Select OnClick above
      toggle: noop,
    };
  },
});

export const Select = createComponent({
  as: "button",
  memo: true,
  useHook: useSelect,
});

const handleCharacterPress =
  (options: SelectOptions) => (character: string) => {
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

const noop = () => {};

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
