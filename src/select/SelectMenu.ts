/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { createOnKeyDown } from "reakit-utils";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./useSelectState";
import { createHook, createComponent } from "reakit-system";
import { SELECT_KEYS } from "./__keys";

export type SelectMenuOptions = Pick<
  SelectStateReturn,
  "selected" | "hide" | "show" | "visible"
> & {
  onChange?: (value: any) => void;
};

const useSelectMenu = createHook<SelectMenuOptions, BoxHTMLProps>({
  name: "SelectMenu",
  keys: SELECT_KEYS,

  useProps({ selected, onChange, hide, show, visible }, { ...htmlProps }) {
    React.useEffect(() => {
      onChange && onChange(selected);
    }, [selected]);

    const onKeyDown = React.useMemo(() => {
      return createOnKeyDown({
        stopPropagation: true,
        keyMap: () => ({
          Escape: hide,
          ArrowUp: show,
          ArrowDown: show,
        }),
      });
    }, []);

    return {
      onKeyDown,
      role: "button",
      "aria-expanded": visible,
      "aria-haspopup": "listbox",
      ...htmlProps,
    };
  },
});

export const SelectMenu = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectMenu,
});
