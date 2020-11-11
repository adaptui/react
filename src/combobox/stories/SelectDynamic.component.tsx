import * as React from "react";

import {
  SelectInitialState,
  useSelectState,
  Select,
  SelectPopover,
  SelectOption,
} from "../index";
import { fruits } from "./fruits";

export const App: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ values: fruits, gutter: 8 });
  console.log("%c select", "color: #00258c", select);

  return (
    <>
      <Select className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </Select>
      <SelectPopover {...select} aria-label="Fruits">
        {select.values.length
          ? select.values.map(value => (
              <SelectOption {...select} key={value} value={value} />
            ))
          : "No results found"}
      </SelectPopover>
    </>
  );
};

export default App;
