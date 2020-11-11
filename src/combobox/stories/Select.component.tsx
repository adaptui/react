import * as React from "react";

import {
  SelectInitialState,
  useSelectState,
  Select,
  SelectPopover,
  SelectOption,
} from "../index";

export const App: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ gutter: 8 });
  console.log("%c select", "color: #00258c", select);

  return (
    <>
      <Select className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </Select>
      <SelectPopover {...select} aria-label="Fruits">
        <SelectOption {...select} value="Apple" />
        <SelectOption {...select} value="AppleCusturd" />
        <SelectOption {...select} value="Orange" />
        <SelectOption {...select} value="Banana" />
      </SelectPopover>
    </>
  );
};

export default App;
