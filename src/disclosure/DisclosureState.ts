import * as React from "react";
import {
  unstable_IdActions,
  unstable_IdInitialState,
  unstable_IdState,
  unstable_useIdState,
} from "reakit";

import { useControllableState } from "../utils";

export type DisclosureState = unstable_IdState & {
  /**
   * Whether it's expanded or not.
   */
  visible: boolean;
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
  setVisible: React.Dispatch<React.SetStateAction<DisclosureState["visible"]>>;
};

export type DisclosureStateReturn = DisclosureState & DisclosureActions;

export type DisclosureInitialState = unstable_IdInitialState &
  Partial<Pick<DisclosureState, "visible">> & {
    /**
     * Default uncontrolled state.
     */
    defaultVisible?: boolean;

    /**
     * Controllabele state.
     */
    visible?: boolean;

    /**
     * controllable state callback.
     */
    onVisibleChange?: (expanded: boolean) => void;
  };

export const useDisclosureState = (
  props: DisclosureInitialState = {},
): DisclosureStateReturn => {
  const {
    defaultVisible = false,
    visible: initialVisible,
    onVisibleChange,
  } = props;
  const id = unstable_useIdState();
  const [visible, setVisible] = useControllableState({
    defaultValue: defaultVisible,
    value: initialVisible,
    onChange: onVisibleChange,
  });

  const show = React.useCallback(() => setVisible(true), [setVisible]);
  const hide = React.useCallback(() => setVisible(false), [setVisible]);
  const toggle = React.useCallback(() => setVisible(e => !e), [setVisible]);

  return {
    ...id,
    visible,
    setVisible,
    show,
    hide,
    toggle,
  };
};
