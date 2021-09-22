import * as React from "react";

import {
  Select as RenderlesskitSelect,
  SelectInitialState,
  SelectOption,
  SelectPopover,
  useSelectState,
} from "../../index";

import { fruits } from "./Utils.component";

export const Select: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ gutter: 8, ...props });

  return (
    <>
      <RenderlesskitSelect className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </RenderlesskitSelect>
      <SelectPopover {...select} aria-label="Fruits">
        {fruits.length
          ? fruits.map(value => (
              <SelectOption {...select} key={value} value={value} />
            ))
          : "No results found"}
      </SelectPopover>
    </>
  );
};

export default Select;
