import * as React from "react";

import {
  Checkbox as RenderlesskitCheckbox,
  CheckboxProps as RenderlesskitCheckboxProps,
  useCheckboxState,
  CheckboxInitialState,
} from "../index";
import { splitStateProps } from "../../utils/index";
import { USE_CHECKBOX_STATE_KEYS } from "../__keys";

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
