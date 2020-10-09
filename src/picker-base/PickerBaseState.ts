import {
  PopoverInitialState,
  usePopoverState,
  unstable_useId as useId,
} from "reakit";
import { InputBase } from "@react-types/shared";

export interface PickerBaseInitialState extends PopoverInitialState, InputBase {
  pickerId?: string;
  dialogId?: string;
  focus?: () => void;
}

export const usePickerBaseState = (props: PickerBaseInitialState = {}) => {
  const {
    pickerId: pickerIdProp,
    dialogId: dialogIdProp,
    isDisabled,
    isReadOnly,
    focus,
  } = props;

  const { id: pickerId } = useId({ id: pickerIdProp, baseId: "picker" });
  const { id: dialogId } = useId({ id: dialogIdProp, baseId: "dialog" });

  const popover = usePopoverState({ modal: true, ...props });

  return {
    pickerId,
    dialogId,
    isDisabled,
    isReadOnly,
    focus,
    ...popover,
  };
};

export type PickerBaseStateReturn = ReturnType<typeof usePickerBaseState>;
