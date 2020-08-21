/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { createOnKeyDown } from "reakit-utils";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./useSelectState";
import { createHook, createComponent } from "reakit-system";

export type SelectMenuOptions = Pick<
  SelectStateReturn,
  | "setTypehead"
  | "isDropdownOpen"
  | "selected"
  | "openDropdown"
  | "closeDropdown"
> & {
  onChange?: (value: any) => void;
};

const useSelectMenu = createHook<SelectMenuOptions, BoxHTMLProps>({
  name: "SelectMenu",
  keys: [
    "setTypehead",
    "isDropdownOpen",
    "selected",
    "onChange",
    "openDropdown",
    "closeDropdown",
  ],

  useProps(
    {
      setTypehead,
      isDropdownOpen,
      selected,
      onChange,
      openDropdown,
      closeDropdown,
    },
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
        keyMap: () => {
          return {
            Escape: () => {
              closeDropdown();
            },
            ArrowUp: () => {
              openDropdown();
            },
            ArrowDown: () => {
              openDropdown();
            },
          };
        },
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
      if (typed !== "") {
        clearKeyStrokes();
      }
    }, [typed]);

    const handleOnKeyPress = (e: React.KeyboardEvent) => {
      e.persist();
      // skip the enter key
      if (e.key === "Enter") return;
      setTyped(prev => prev + e.key);
    };

    return {
      role: "button",
      "aria-expanded": isDropdownOpen,
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
