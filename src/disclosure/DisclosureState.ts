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
  expanded: boolean;

  /**
   * Direction of the transition.
   *
   * @default vertical
   */
  direction: "vertical" | "horizontal";

  /**
   * Size of the content.
   *
   * @default 0
   */
  contentSize: number;

  /**
   * Duration of the transition.
   * By default the duration is calculated based on the size of change.
   */
  duration?: number;

  /**
   * Transition Easing.
   *
   * @default cubic-bezier(0.4, 0, 0.2, 1)
   */
  easing: string;
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

  /**
   * Callback called before the expand transition starts.
   */
  onExpandStart?: () => void;

  /**
   * Callback called after the expand transition ends.
   */
  onExpandEnd?: () => void;

  /**
   * Callback called before the collapse transition starts.
   */
  onCollapseStart?: () => void;

  /**
   * Callback called after the collapse transition ends..
   */
  onCollapseEnd?: () => void;
};

export type DisclosureStateReturn = DisclosureState & DisclosureActions;

export type DisclosureInitialState = unstable_IdInitialState &
  Partial<
    Pick<
      DisclosureState,
      "expanded" | "direction" | "contentSize" | "easing" | "duration"
    >
  > &
  Pick<
    DisclosureActions,
    "onExpandStart" | "onExpandEnd" | "onCollapseStart" | "onCollapseEnd"
  > & {
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
    direction = "vertical",
    contentSize = 0,
    duration,
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
    onCollapseEnd,
    onCollapseStart,
    onExpandEnd,
    onExpandStart,
  } = props;
  const id = unstable_useIdState();
  const [expanded, setExpanded] = useControllableState({
    defaultValue: defaultExpanded,
    value: initialExpanded,
    onChange: onExpandedChange,
  });

  const show = React.useCallback(() => setExpanded(true), [setExpanded]);
  const hide = React.useCallback(() => setExpanded(false), [setExpanded]);
  const toggle = React.useCallback(() => setExpanded(e => !e), [setExpanded]);

  return {
    ...id,
    expanded,
    direction,
    contentSize,
    duration,
    easing,
    show,
    hide,
    toggle,
    setExpanded,
    onCollapseEnd,
    onCollapseStart,
    onExpandEnd,
    onExpandStart,
  };
};
