import React from "react";
import { SelectStateReturn } from "./SelectState";
import { createHook, createComponent } from "reakit-system";
import { SELECT_KEYS } from "./__keys";
import {
  usePopoverDisclosure,
  PopoverDisclosureHTMLProps,
  PopoverDisclosureOptions,
} from "reakit/Popover";
import { useShortcut } from "@chakra-ui/hooks";
import { createOnKeyDown, useLiveRef, useForkRef } from "reakit-utils";
import { callAllHandlers, getNextItemFromSearch } from "@chakra-ui/utils";

export type SelectTriggerOptions = PopoverDisclosureOptions &
  Pick<
    SelectStateReturn,
    | "visible"
    | "values"
    | "selected"
    | "setSelected"
    | "show"
    | "hide"
    | "first"
    | "last"
  >;

const useSelectTrigger = createHook<
  SelectTriggerOptions,
  PopoverDisclosureHTMLProps
>({
  name: "SelectTrigger",
  compose: [usePopoverDisclosure],
  keys: SELECT_KEYS,

  useProps(options, { ref: htmlRef, onKeyDown: htmlOnKeyDown, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const disabled = options.disabled || htmlProps["aria-disabled"];
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);

    // Reference:
    // https://github.com/chakra-ui/chakra-ui/blob/83eec5b140bd9a69821d8e4df3e69bff0768dcca/packages/menu/src/use-menu.ts#L228-L253
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
          const selectedValue = options.values.find(value =>
            options.selected.includes(value.value),
          );

          const nextItem = getNextItemFromSearch(
            options.values,
            character,
            item => item?.value ?? "",
            selectedValue,
          );

          if (nextItem?.value) {
            options.setSelected(nextItem.value);
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
          if (!options.selected?.length) {
            options.first && setTimeout(options.first);
          } else {
            options.show?.();
          }
        };
        const hide = options.hide && (() => options.hide?.());
        const last = () => {
          if (!options.selected?.length) {
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

    return {
      ref: useForkRef(ref, htmlRef),
      onKeyDown,
      "aria-haspopup": "listbox",
      ...htmlProps,
    };
  },
});

export const SelectTrigger = createComponent({
  as: "div",
  useHook: useSelectTrigger,
});
