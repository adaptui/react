import * as React from "react";

import {
  useCheckboxState,
  CheckboxInitialState,
  Checkbox as RenderlesskitCheckbox,
  CheckboxProps as RenderlesskitCheckboxProps,
  USE_CHECKBOX_STATE_KEYS,
  splitStateProps,
} from "../../index";

export type CheckboxProps = RenderlesskitCheckboxProps &
  CheckboxInitialState & {};

export const Checkbox: React.FC<CheckboxProps> = props => {
  const [stateProps, checkboxProps] = splitStateProps<
    CheckboxInitialState,
    CheckboxProps
  >(props, USE_CHECKBOX_STATE_KEYS);

  const state = useCheckboxState(stateProps);

  return <RenderlesskitCheckbox {...state} {...checkboxProps} />;
};

export default Checkbox;
