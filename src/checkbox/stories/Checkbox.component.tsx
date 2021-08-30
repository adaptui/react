import * as React from "react";

import {
  Checkbox,
  CheckboxProps,
  useCheckboxState,
} from "@renderlesskit/react";

export interface AppProps extends CheckboxProps {}

export const App: React.FC<AppProps> = props => {
  const state = useCheckboxState(props);

  return <Checkbox {...state} />;
};

export default App;
