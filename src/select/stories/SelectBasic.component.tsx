import * as React from "react";

import {
  Select as RenderlesskitSelect,
  SelectOption,
  SelectPopover,
  useSelectState,
  SelectInitialState,
} from "../../index";

export const Select: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ gutter: 8, ...props });

  return (
    <>
      <RenderlesskitSelect className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </RenderlesskitSelect>
      <SelectPopover {...select} aria-label="Fruits">
        <SelectOption {...select} value="Apple" />
        <SelectOption {...select} value="AppleCusturd" />
        <SelectOption {...select} value="Orange" />
        <SelectOption {...select} value="Banana" />
      </SelectPopover>
    </>
  );
};

export default Select;
