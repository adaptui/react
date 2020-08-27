import * as React from "react";
import { useShortcut } from "@chakra-ui/hooks";
import { useLiveRef, useForkRef } from "reakit-utils";
import { createHook, createComponent } from "reakit-system";
import {
  PopoverDisclosureHTMLProps,
  PopoverDisclosureOptions,
  usePopoverDisclosure,
} from "reakit";
import {
  callAllHandlers,
  createOnKeyDown,
  getNextItemFromSearch,
  noop,
} from "@chakra-ui/utils";

import { PICKER_STATE_KEYS } from "./__keys";
import { PickerStateReturn } from "./PickerState";

export type PickerButtonOptions = PopoverDisclosureOptions & PickerStateReturn;

export type PickerButtonHTMLProps = PopoverDisclosureHTMLProps;

export type PickerButtonProps = PickerButtonOptions & PickerButtonHTMLProps;

const usePickerButton = createHook<PickerButtonOptions, PickerButtonHTMLProps>({
  name: "usePickerButton",
  compose: usePopoverDisclosure,
  keys: PICKER_STATE_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(
    options,
    {
      ref: htmlRef,
      onClick: htmlOnClick,
      onMouseDown: htmlOnMouseDown,
      onKeyDown: htmlOnKeyDown,
      ...htmlProps
    },
  ) {
    const ref = React.useRef<HTMLElement>(null);
    const hasPressedMouse = React.useRef(false);
    const disabled = options.disabled || htmlProps["aria-disabled"];

    const onClickRef = useLiveRef(htmlOnClick);
    const onMouseDownRef = useLiveRef(htmlOnMouseDown);
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);

    const onCharacterPress = useShortcut({
      preventDefault: event => event.key !== " ",
    });

    const onKeyDown = createOnKeyDown({
      onKeyDown: callAllHandlers(
        onCharacterPress(character => {
          /**
           * Typeahead: Based on current character pressed,
           * find the next item to be selected
           */
          const selectedValue = options.values.find(
            value => value.value === options.selectedValue,
          );

          const nextItem = getNextItemFromSearch(
            options.values,
            character,
            item => item?.value ?? "",
            selectedValue,
          );

          if (nextItem?.value) {
            options.setSelectedValue(nextItem.value);
          }
        }),
        onKeyDownRef.current,
      ),
      // Doesn't prevent default on Escape, otherwise we can't close
      // dialogs when PickerButton is focused
      preventDefault: event => event.key !== "Escape",
      stopPropagation: event => event.key !== "Escape",
      shouldKeyDown: event => event.key === "Escape" || !disabled,
      onKey: () => options.show(),
      keyMap: (() => {
        // setTimeout prevents scroll jump
        const first = () => {
          if (!options.selectedValue) {
            options.first && setTimeout(options.first);
          } else {
            options.show?.();
          }
        };
        const hide = options.hide && (() => options.hide?.());
        const last = () => {
          if (!options.selectedValue) {
            options.last && setTimeout(options.last);
          } else {
            options.show?.();
          }
        };
        return {
          Escape: hide,
          Enter: first,
          " ": first,
          ArrowUp: last,
          ArrowDown: first,
        };
      })(),
    });

    const onMouseDown = React.useCallback((event: React.MouseEvent) => {
      // To determine if the picker is clicked by mouse
      hasPressedMouse.current = true;
      onMouseDownRef.current?.(event);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClick = React.useCallback(
      (event: React.MouseEvent) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;

        options.toggle?.();

        // Focus the menu popover when it's opened with mouse click.
        if (
          hasPressedMouse.current &&
          !options.visible &&
          !options.selectedValue
        ) {
          options.move?.(null);
        }

        hasPressedMouse.current = false;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [options.toggle, options.selectedValue, options.items, options.move],
    );

    return {
      ref: useForkRef(ref, htmlRef),
      "aria-haspopup": "listbox",
      onClick,
      onMouseDown,
      onKeyDown,
      ...htmlProps,
    };
  },

  useComposeOptions(options) {
    return {
      ...options,
      // Toggling is nooped, so Disclosure doesn't again toggle it
      toggle: noop,
    };
  },
});

export const PickerButton = createComponent({
  as: "button",
  memo: true,
  useHook: usePickerButton,
});
