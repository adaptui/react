/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { createOnKeyDown } from "reakit-utils";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./useSelectState";
import { createHook, createComponent } from "reakit-system";
import { SELECT_KEYS } from "./__keys";

export type SelectMenuOptions = Pick<
  SelectStateReturn,
  "setTypehead" | "selected" | "hide" | "show" | "visible" | "isCombobox"
> & {
  onChange?: (value: any) => void;
};

const useSelectMenu = createHook<SelectMenuOptions, BoxHTMLProps>({
  name: "SelectMenu",
  keys: SELECT_KEYS,

  useProps(
    { setTypehead, selected, onChange, hide, show, visible, isCombobox },
    { ...htmlProps },
  ) {
    const keyClear = React.useRef<any>(null);
    const [typed, setTyped] = React.useState("");

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

    const clearKeyStrokes = () => {
      setTypehead(typed);

      if (keyClear.current) {
        clearTimeout(keyClear.current);
        keyClear.current = null;
      }

      keyClear.current = setTimeout(() => {
        setTyped("");
        keyClear.current = null;
      }, 800);
    };

    React.useEffect(() => {
      if (typed !== "" && !isCombobox) {
        clearKeyStrokes();
      }
    }, [typed, isCombobox]);

    const handleOnKeyPress = (e: React.KeyboardEvent) => {
      if (isCombobox) return;
      e.persist();
      // skip the enter key
      if (e.key === "Enter") return;
      setTyped(prev => prev + e.key);
    };

    return {
      role: "button",
      "aria-expanded": visible,
      "aria-haspopup": "listbox",
      onKeyDown,
      onKeyPress: handleOnKeyPress,
      ...htmlProps,
    };
  },
});

export const SelectMenu = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectMenu,
});
