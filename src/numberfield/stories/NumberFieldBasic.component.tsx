import * as React from "react";
import { useLocale } from "@react-aria/i18n";

import {
  NumberFieldBaseStateProps,
  NumberFieldDecrementButton,
  NumberFieldGroup,
  NumberFieldIncrementButton,
  NumberFieldInput,
  NumberFieldLabel,
  useNumberFieldBaseState,
  useNumberFieldState,
} from "../../index";

export type NumberFieldBasicProps = NumberFieldBaseStateProps & {};

export const NumberFieldBasic: React.FC<NumberFieldBasicProps> = props => {
  let { locale } = useLocale();
  const baseState = useNumberFieldBaseState({ ...props, locale });
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
