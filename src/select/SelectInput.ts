import React from "react";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./useSelectState";
import { createHook, createComponent } from "reakit-system";
import { SELECT_KEYS } from "./__keys";
import { useComposite, usePopoverDisclosure } from "reakit";

export type SelectInputOptions = Pick<
  SelectStateReturn,
  | "toggle"
  | "visible"
  | "inputValue"
  | "setInputValue"
  | "removeSelected"
  | "selected"
>;

const useSelectInput = createHook<SelectInputOptions, BoxHTMLProps>({
  name: "SelectInput",
  compose: [useComposite, usePopoverDisclosure],
  keys: SELECT_KEYS,

  useProps(
    { selected, inputValue, visible, removeSelected, setInputValue },
    { ref: htmlRef, ...htmlProps },
  ) {
    return {
      type: "text",
      value: inputValue,
      onKeyDown: e => {
        if (e.key === "Backspace" && inputValue === "") {
          removeSelected(selected[selected.length - 1]);
        }
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      "aria-haspopup": "listbox",
      "aria-expanded": visible,
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
