import * as React from "react";

import { Link } from "renderless-components";

export interface AppProps {
  /**
   * Opens the link in a new tab
   * @default false
   */
  isExternal?: boolean;
  /**
   * Same as the HTML attribute.
   * @default false
   */
  disabled?: boolean;
}

export const App: React.FC<AppProps> = props => {
  return <Link {...props}>Reakit</Link>;
};

export default App;
