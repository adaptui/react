import * as React from "react";

import {
  SelectInitialState,
  useSelectState,
  Select,
  SelectPopover,
  SelectOption,
} from "renderless-components";
import { fruits } from "./fruits";

export const App: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ gutter: 8, ...props });

  return (
    <>
      <h2>Hover over the button to open the options</h2>
      <Select
        className="select"
        {...select}
        onMouseEnter={() => select.show()}
        aria-label="Fruit"
      >
        {select.selectedValue || "Select a fruit"}
      </Select>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => {
          select.setSelectedValue(null);
        }}
        aria-label="clear selection"
      >
        &#215;
      </button>
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
