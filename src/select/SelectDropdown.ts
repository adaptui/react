/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { SELECT_KEYS } from "./__keys";
import debounce from "lodash.debounce";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { useForkRef, contains } from "reakit-utils";
import { SelectStateReturn } from "./useSelectState";
import { createComponent, createHook } from "reakit-system";
import { useComposite, CompositeProps } from "reakit/Composite";

export type SelectDropdownOptions = CompositeProps &
  Pick<
    SelectStateReturn,
    "isDropdownOpen" | "selected" | "setSelected" | "typehead" | "closeDropdown"
  > & {
    maxHeight?: string | number;
  };

const useSelectDropdown = createHook<SelectDropdownOptions, BoxHTMLProps>({
  name: "selectDropdown",
  compose: useComposite,
  keys: [
    "maxHeight",
    "move",
    "isDropdownOpen",
    "items",
    "selected",
    "setSelected",
    "setCurrentId",
    "typehead",
    "closeDropdown",
    ...SELECT_KEYS,
  ],

  useProps(
    {
      maxHeight = 500,
      move,
      isDropdownOpen,
      items,
      selected,
      setSelected,
      setCurrentId,
      typehead,
      closeDropdown,
    },
    { ref: htmlRef, ...htmlProps },
  ) {
    const ref = React.useRef<HTMLElement>(null);
    const [position, setPosition] = React.useState("top");

    const calculateDropdownPosition = React.useCallback(() => {
      if (ref.current) {
        const bounds = ref.current.getBoundingClientRect();
        if (bounds.y < 0) {
          setPosition("top");
        }

        if (bounds.bottom - 50 > window.innerHeight) {
          setPosition("bottom");
        }
      }
    }, []);

    React.useLayoutEffect(() => {
      calculateDropdownPosition();
    }, [calculateDropdownPosition, isDropdownOpen]);

    React.useLayoutEffect(() => {
      window.addEventListener("scroll", calculateDropdownPosition);
      return () =>
        window.removeEventListener("scroll", calculateDropdownPosition);
    }, [calculateDropdownPosition]);

    React.useEffect(() => {
      if (!items[0]) return;

      const selectedItem = items.filter(item => {
        if (!item.ref.current) return false;
        return selected.includes(
          item.ref.current.getAttribute("data-value") as string,
        );
      });

      if (selectedItem.length > 0) {
        setCurrentId(selectedItem[0].id);
        move(selectedItem[0].id);
      } else {
        setCurrentId(items[0].id);
        move(items[0].id);
      }
    }, [isDropdownOpen]);

    React.useEffect(
      debounce(() => {
        if (typehead === "") return;

        items.forEach(item => {
          if (!item.ref.current) return;
          const dataAttrValue = item.ref.current.getAttribute(
            "data-value",
          ) as string;

          if (
            !selected.includes(dataAttrValue) &&
            dataAttrValue.startsWith(typehead)
          ) {
            setCurrentId(item.id);
            // remain dropdown open on setSelected
            setSelected(dataAttrValue, true);
            move(item.id);
          }
        });
      }, 400),
      [typehead],
    );

    const clickOutside = React.useCallback(e => {
      e.stopPropagation();
      if (contains(e.target, ref.current as Element)) {
        closeDropdown();
      }
    }, []);

    React.useEffect(() => {
      window.addEventListener("click", clickOutside);
      return () => window.removeEventListener("click", clickOutside);
    }, [clickOutside]);

    return {
      tabIndex: -1,
      ref: useForkRef(ref, htmlRef),
      role: "listbox",
      "aria-orientation": "vertical",
      "aria-hidden": !isDropdownOpen,
      style: {
        maxHeight: maxHeight,
        overflowY: "scroll",
        display: isDropdownOpen ? "block" : "none",
        [position]: "100%",
      },
      ...htmlProps,
    };
  },
});

const SelectDropdown = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectDropdown,
});

export { SelectDropdown };
