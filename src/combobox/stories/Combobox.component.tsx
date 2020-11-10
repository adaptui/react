import * as React from "react";

import {
  ComboboxInitialState,
  useComboboxState,
  Combobox,
  ComboboxPopover,
  ComboboxOption,
} from "../index";

export const App: React.FC<ComboboxInitialState> = props => {
  const combobox = useComboboxState({ gutter: 8 });

  return (
    <>
      <Combobox {...combobox} aria-label="Fruit" />
      <ComboboxPopover {...combobox} aria-label="Fruits">
        <ComboboxOption {...combobox} value="Apple" />
        <ComboboxOption {...combobox} value="Orange" />
        <ComboboxOption {...combobox} value="Banana" />
      </ComboboxPopover>
    </>
  );
};

export default App;
