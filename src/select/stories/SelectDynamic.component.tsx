import * as React from "react";

import {
  Select,
  SelectOption,
  SelectPopover,
  useSelectState,
  SelectInitialState,
} from "../../index";
import { fruits } from "./Utils.component";

export const App: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ gutter: 8, ...props });

  return (
    <>
      <Select className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </Select>
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

export default App;
