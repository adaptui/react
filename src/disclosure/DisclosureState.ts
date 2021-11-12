import * as React from "react";
import {
  unstable_IdActions,
  unstable_IdInitialState,
  unstable_IdState,
  unstable_useIdState,
} from "reakit";

import { useControllableState } from "../utils";
import { PresenceInitialState, PresenceState, usePresenceState } from "..";

export type DisclosureState = unstable_IdState &
  PresenceState & {
    /**
     * Whether it's expanded or not.
     */
    expanded: boolean;
  };

export type DisclosureActions = unstable_IdActions & {
  /**
   * Changes the `expanded` state to `true`
   */
  show: () => void;

  /**
   * Changes the `expanded` state to `false`
   */
  hide: () => void;

  /**
   * Toggles the `expanded` state
   */
  toggle: () => void;

  /**
   * Sets `expanded`.
   */
  setExpanded: React.Dispatch<
    React.SetStateAction<DisclosureState["expanded"]>
  >;
};

export type DisclosureStateReturn = DisclosureState & DisclosureActions;

export type DisclosureInitialState = unstable_IdInitialState &
  PresenceInitialState &
  Partial<Pick<DisclosureState, "expanded">> & {
    /**
     * Default uncontrolled state.
     */
    defaultExpanded?: boolean;

    /**
     * Controllabele state.
     */
    expanded?: boolean;

    /**
     * controllable state callback.
     */
    onExpandedChange?: (expanded: boolean) => void;
  };

export const useDisclosureState = (
  props: DisclosureInitialState = {},
): DisclosureStateReturn => {
  const {
    defaultExpanded = false,
    expanded: initialExpanded,
    onExpandedChange,
  } = props;
  const id = unstable_useIdState();
  const [expanded, setExpanded] = useControllableState({
    defaultValue: defaultExpanded,
    value: initialExpanded,
    onChange: onExpandedChange,
  });
  const presence = usePresenceState({ present: expanded });

  const show = React.useCallback(() => setExpanded(true), [setExpanded]);
  const hide = React.useCallback(() => setExpanded(false), [setExpanded]);
  const toggle = React.useCallback(() => setExpanded(e => !e), [setExpanded]);

  return {
    ...id,
    expanded,
    setExpanded,
    show,
    hide,
    toggle,
    ...presence,
  };
};
