import * as React from "react";

import {
  PickerBase,
  PickerBaseTrigger,
  PickerBaseContent,
  usePickerBaseState,
  PickerBaseInitialState,
} from "../../index";

export const App: React.FC<PickerBaseInitialState> = props => {
  const state = usePickerBaseState(props);

  return (
    <>
      <PickerBase {...state}>
        <PickerBaseTrigger {...state}>open</PickerBaseTrigger>
      </PickerBase>
      <PickerBaseContent {...state}>Content</PickerBaseContent>
    </>
  );
};

export default App;
