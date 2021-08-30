import * as React from "react";

import { Checkbox, CheckboxProps } from "@renderlesskit/react";

export interface AppProps extends CheckboxProps {}

export const App: React.FC<AppProps> = props => {
  const [checked, setChecked] = React.useState(false);
  const toggle = () => setChecked(!checked);

  return <Checkbox checked={checked} onChange={toggle} />;
};

export default App;
