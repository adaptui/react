import { useLocale } from "@react-aria/i18n";
import {
  NumberFieldState,
  NumberFieldStateProps,
  useNumberFieldState,
} from "@react-stately/numberfield";

export function useNumberFieldBaseState(
  props: NumberFieldBaseStateProps,
): NumberFieldBaseState {
  let { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });

  return state;
}

export type NumberFieldBaseState = NumberFieldState & {};

export type NumberFieldBaseStateProps = Omit<
  NumberFieldStateProps,
  "locale"
> & {};
