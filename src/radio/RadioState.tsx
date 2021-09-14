import * as React from "react";
import { useControllableState } from "../utils";
import {
  CompositeState,
  CompositeActions,
  CompositeInitialState,
  useCompositeState,
} from "reakit";

export type RadioState = CompositeState & {
  /**
   * The `value` attribute of the current checked radio.
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
   * Default State of the Checkbox for uncontrolled Checkbox.
   *
   * @default false
   */
  defaultState?: RadioState["state"];

  /**
   * State of the Checkbox for controlled Checkbox..
   */
  state?: RadioState["state"];

  /**
   * OnChange callback for controlled Checkbox.
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
