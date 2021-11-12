import * as React from "react";

import { Presence, usePresenceState } from "../../index";

export type PresenceAnimatedProps = {};

export const PresenceAnimated = () => {
  const [open, setOpen] = React.useState(true);

  const state = usePresenceState({ present: open });

  return (
    <>
      <button onClick={() => setOpen(prevOpen => !prevOpen)}>toggle</button>

      {state.isPresent ? (
        <Presence
          {...state}
          data-state={open ? "open" : "closed"}
          className="content"
        >
          Content
        </Presence>
      ) : null}
    </>
  );
};
