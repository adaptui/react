import { useControllableState } from "../utils/index";

export type CheckboxState = {
  /**
   * Stores the state of the checkbox.
   * If checkboxes that share this state have defined a `value` prop, it's
   * going to be an array.
   */
  state: boolean | "indeterminate" | Array<number | string>;
};

export type CheckboxActions = {
  /**
   * Sets `state` for the checkbox.
   */
  setState: React.Dispatch<React.SetStateAction<CheckboxState["state"]>>;
};

export type CheckboxInitialState = {
  /**
   * Default State of the Checkbox for uncontrolled Checkbox.
   *
   * @default false
   */
  defaultState?: CheckboxState["state"];

  /**
   * State of the Checkbox for controlled Checkbox..
   */
  state?: CheckboxState["state"];

  /**
   * OnChange callback for controlled Checkbox.
   */
  onStateChange?: React.Dispatch<React.SetStateAction<CheckboxState["state"]>>;
};

export type CheckboxStateReturn = CheckboxState & CheckboxActions;

export function useCheckboxState(
  props: CheckboxInitialState = {},
): CheckboxStateReturn {
  const {
    // Default State should be false otherwise input state will be undefined
    defaultState = false,
    state: stateProp,
    onStateChange,
  } = props;

  const [state, setState] = useControllableState({
    defaultValue: defaultState,
    value: stateProp,
    onChange: onStateChange,
  });

  return { state, setState };
}
