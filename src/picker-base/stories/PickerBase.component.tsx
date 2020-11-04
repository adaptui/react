import * as React from "react";

import {
  PickerBase,
  PickerBaseTrigger,
  PickerBaseContent,
  usePickerBaseState,
} from "renderless-components";

export interface AppProps {
  visible?: boolean;
}

export const App = (props: AppProps) => {
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
