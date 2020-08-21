import React from "react";
import { enterOrSpace } from "./common";
import { useForkRef } from "reakit-utils";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./useSelectState";
import { createHook, createComponent } from "reakit-system";

export type SelectTriggerOptions = Pick<
  SelectStateReturn,
  "toggleDropdown" | "isDropdownOpen"
>;

const useSelectTrigger = createHook<SelectTriggerOptions, BoxHTMLProps>({
  name: "selectTrigger",
  keys: ["toggleDropdown", "isDropdownOpen"],
  useProps({ toggleDropdown, isDropdownOpen }, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
      if (isDropdownOpen === false && ref.current) {
        ref.current.focus();
      }
    }, [isDropdownOpen]);

    return {
      ref: useForkRef(ref, htmlRef),
      role: "button",
      "aria-haspopup": "listbox",
      "aria-expanded": isDropdownOpen,
      tabIndex: 0,
      onKeyDown: e => enterOrSpace(e, toggleDropdown),
      onClick: toggleDropdown,
      ...htmlProps,
    };
  },
});

const SelectTrigger = createComponent({
  as: "div",
  useHook: useSelectTrigger,
});

export { SelectTrigger };
