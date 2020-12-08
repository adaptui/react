import {
  usePopoverState,
  PopoverInitialState,
  unstable_useId as useId,
} from "reakit";
import { InputBase } from "@react-types/shared";

export type PickerBaseInitialState = PopoverInitialState &
  InputBase & {
    /**
     * Picker wrapper Id
     */
    pickerId?: string;
    /**
     * Dialog Id
     */
    dialogId?: string;
    /**
     * Function to be called on picker mousedown
     * for focusing first tabbable element
     */
    segmentFocus?: () => void;
  };

export const usePickerBaseState = (props: PickerBaseInitialState = {}) => {
  const {
    pickerId: pickerIdProp,
    dialogId: dialogIdProp,
    isDisabled,
    isReadOnly,
    segmentFocus,
  } = props;

  const { id: pickerId } = useId({ id: pickerIdProp, baseId: "picker" });
  const { id: dialogId } = useId({ id: dialogIdProp, baseId: "dialog" });

  const popover = usePopoverState({ modal: true, ...props });

  return {
    pickerId,
    dialogId,
    isDisabled,
    isReadOnly,
    segmentFocus,
    ...popover,
  };
};

export type PickerBaseStateReturn = ReturnType<typeof usePickerBaseState>;
