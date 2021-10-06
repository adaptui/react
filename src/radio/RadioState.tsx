import * as React from "react";
import {
  CompositeActions,
  CompositeInitialState,
  CompositeState,
  useCompositeState,
} from "reakit";

import { useControllableState } from "../utils";

export type RadioState = CompositeState & {
  /**
   * The `value` attribute of the current active radio.
   */
  state: string | number | null;
};

export type RadioActions = CompositeActions & {
  /**
   * Sets `state`.
   */
  setState: React.Dispatch<React.SetStateAction<string | number | null>>;
};

export type RadioInitialState = CompositeInitialState & {
  /**
   * Default State of the Radio for uncontrolled Radio.
   *
   * @default false
   */
  defaultState?: RadioState["state"];

  /**
   * State of the Radio for controlled Radio..
   */
  state?: RadioState["state"];

  /**
   * OnChange callback for controlled Radio.
   */
  onStateChange?: RadioActions["setState"];
};

export type RadioStateReturn = RadioState & RadioActions;

export function useRadioState(props: RadioInitialState): RadioStateReturn {
  const {
    defaultState,
    state: stateProps,
    onStateChange,
    loop = true,
    ...sealed
  } = props;
  const [state, setState] = useControllableState({
    defaultValue: defaultState,
    value: stateProps,
    onChange: onStateChange,
  });
  const composite = useCompositeState({ ...sealed, loop });

  return {
    ...composite,
    state,
    setState,
  };
}
