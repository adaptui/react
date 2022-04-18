import * as React from "react";

import {
  NumberFieldBaseStateProps,
  useNumberFieldBaseState,
} from "../numberfield-base-state";
import { NumberFieldDecrementButton } from "../numberfield-decrement-button";
import { NumberFieldGroup } from "../numberfield-group";
import { NumberFieldIncrementButton } from "../numberfield-increment-button";
import { NumberFieldInput } from "../numberfield-input";
import { NumberFieldLabel } from "../numberfield-label";
import { useNumberFieldState } from "../numberfield-state";

export type NumberFieldBasicProps = NumberFieldBaseStateProps & {};

export const NumberFieldBasic: React.FC<NumberFieldBasicProps> = props => {
  const baseState = useNumberFieldBaseState(props);
  const state = useNumberFieldState({ ...props, state: baseState });

  return (
    <div>
      <NumberFieldLabel state={state}>NumberField</NumberFieldLabel>
      <NumberFieldGroup state={state}>
        <NumberFieldDecrementButton state={state}>-</NumberFieldDecrementButton>
        <NumberFieldInput state={state} />
        <NumberFieldIncrementButton state={state}>+</NumberFieldIncrementButton>
      </NumberFieldGroup>
    </div>
  );
};

export default NumberFieldBasic;
