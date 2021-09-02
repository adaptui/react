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
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const select = useSelectState({ gutter: 8, ...props });

  const onItemClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>, value) => {
      event.preventDefault();
      if (!value) return;

      const index = selectedItems.indexOf(value);
      if (index > 0) {
        setSelectedItems([
          ...selectedItems.slice(0, index),
          ...selectedItems.slice(index + 1),
        ]);
      } else if (index === 0) {
        setSelectedItems([...selectedItems.slice(1)]);
      } else {
        setSelectedItems([...selectedItems, value]);
      }
    },
    [selectedItems, setSelectedItems],
  );

  const buttonText = selectedItems.length
    ? `${selectedItems.length} fruits selected`
    : "Select a fruit";

  return (
    <>
      <Select className="select" {...select} aria-label="Fruit">
        {buttonText}
      </Select>
      <SelectPopover {...select} aria-label="Fruits">
        {fruits.length
          ? fruits.map(value => (
              <SelectOption
                {...select}
                key={value}
                value={value}
                onClick={e => onItemClick(e, value)}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(value)}
                  value={value}
                  onChange={() => null}
                />
                <span />
                {value}
              </SelectOption>
            ))
          : "No results found"}
      </SelectPopover>
    </>
  );
};

export default App;
