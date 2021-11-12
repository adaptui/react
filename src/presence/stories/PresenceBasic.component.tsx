import * as React from "react";

import { Presence, usePresenceState } from "../../index";

export type PresenceBasicProps = {};

export const PresenceBasic = () => {
  const [open, setOpen] = React.useState(true);

  const state = usePresenceState({ present: open });

  return (
    <>
      <button onClick={() => setOpen(prevOpen => !prevOpen)}>toggle</button>

      {state.isPresent ? <Presence {...state}>Content</Presence> : null}
    </>
  );
};
