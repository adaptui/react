/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BoxHTMLProps } from "reakit/ts/Box/Box";
import { SelectStateReturn } from "./SelectState";
import { createHook, createComponent } from "reakit-system";
import { SELECT_KEYS } from "./__keys";

export type SelectOptions = Pick<SelectStateReturn, "selected"> & {
  onChange?: (value: any) => void;
};

const useSelect = createHook<SelectOptions, BoxHTMLProps>({
  name: "Select",
  keys: SELECT_KEYS,

  useProps({ selected, onChange }, { ...htmlProps }) {
    React.useEffect(() => {
      onChange && onChange(selected);
    }, [selected]);

    return {
      ...htmlProps,
    };
  },
});

export const Select = createComponent({
  as: "div",
  memo: true,
  useHook: useSelect,
});
