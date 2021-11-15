// Inspired from Radix UI Presence - https://github.com/radix-ui/primitives/tree/main/packages/react/presence
import * as React from "react";
import { useForkRef } from "reakit-utils";

import { usePresenceState } from "./PresenceState";

export interface PresenceChildrenProps {
  present: boolean;
  children:
    | React.ReactElement
    | ((props: { present: boolean }) => React.ReactElement);
}

export const PresenceChildren: React.FC<PresenceChildrenProps> = props => {
  const { present, children } = props;
  const presence = usePresenceState({ present });

  const child = (
    typeof children === "function"
      ? children({ present: presence.isPresent })
      : React.Children.only(children)
  ) as React.ReactElement;

  const ref = useForkRef(presence.ref, (child as any).ref);
  const forceMount = typeof children === "function";

  return forceMount || presence.isPresent
    ? React.cloneElement(child, { ref })
    : null;
};

PresenceChildren.displayName = "PresenceChildren";
