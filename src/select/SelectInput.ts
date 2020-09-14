import React from "react";
import { BoxHTMLProps } from "reakit/Box";
import { useLiveRef } from "reakit-utils";
import { createHook, createComponent } from "reakit-system";
import { getNextItemFromSearch } from "@chakra-ui/utils";
import {
  useComposite,
  CompositeOptions,
  usePopoverDisclosure,
  PopoverDisclosureOptions,
} from "reakit";

import { SELECT_KEYS } from "./__keys";
import { SelectStateReturn } from "./SelectState";

export type SelectInputOptions = CompositeOptions &
  PopoverDisclosureOptions &
  Pick<
    SelectStateReturn,
    | "toggle"
    | "inputValue"
    | "setInputValue"
    | "removeSelected"
    | "selected"
    | "values"
    | "move"
    | "currentId"
  >;

const useSelectInput = createHook<SelectInputOptions, BoxHTMLProps>({
  name: "SelectInput",
  compose: [useComposite, usePopoverDisclosure],
  keys: SELECT_KEYS,

  useProps(
    {
      selected,
      inputValue,
      values,
      move,
      currentId,
      removeSelected,
      setInputValue,
    },
    { onKeyDown: htmlOnKeyDown, onChange: htmlOnChange, ...htmlProps },
  ) {
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);
    const onChangeRef = useLiveRef(htmlOnChange);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyDownRef.current?.(event);
        if (event.defaultPrevented) return;
        if (event.key === "Backspace" && inputValue === "") {
          removeSelected(selected[selected.length - 1]);
        }
      },
      [onKeyDownRef, removeSelected, inputValue, selected],
    );

    const onChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeRef.current?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        setInputValue(event.target.value);

        // Move focus to value that matches the input value.
        const selectedValue = values.find(value => value.id === currentId);
        const nextItem = getNextItemFromSearch(
          values,
          event.target.value,
          item => item?.value ?? "",
          selectedValue,
        );

        if (nextItem?.id) {
          move?.(nextItem.id);
        }
      },
      [onChangeRef, setInputValue, currentId, values, move],
    );

    return {
      type: "text",
      value: inputValue,
      onKeyDown,
      onChange,
      "aria-haspopup": "listbox",
      autoCorrect: "off",
      autoComplete: "off",
      autoCapitalize: "none",
      tabIndex: 0,
      ...htmlProps,
    };
  },
});

export const SelectInput = createComponent({
  as: "input",
  useHook: useSelectInput,
});
