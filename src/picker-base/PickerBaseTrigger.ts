import {
  usePopoverDisclosure,
  PopoverDisclosureHTMLProps,
  PopoverDisclosureOptions,
} from "reakit";
import { callAllHandlers } from "@chakra-ui/utils";
import { createComponent, createHook } from "reakit-system";

import { PICKER_BASE_TRIGGER_KEYS } from "./__keys";
import { PickerBaseStateReturn } from "./PickerBaseState";

export type PickerBaseTriggerOptions = PopoverDisclosureOptions &
  Pick<PickerBaseStateReturn, "isDisabled" | "isReadOnly">;

export type PickerBaseTriggerHTMLProps = PopoverDisclosureHTMLProps;

export type PickerBaseTriggerProps = PickerBaseTriggerOptions &
  PickerBaseTriggerHTMLProps;

export const usePickerBaseTrigger = createHook<
  PickerBaseTriggerOptions,
  PickerBaseTriggerHTMLProps
>({
  name: "PickerBaseTrigger",
  compose: usePopoverDisclosure,
  keys: PICKER_BASE_TRIGGER_KEYS,

  useOptions(options, _) {
    return {
      disabled: options.isDisabled || options.isReadOnly,
      ...options,
    };
  },

  useProps(_, { onMouseDown: htmlOnMouseDown, ...htmlProps }) {
    const onMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return {
      tabIndex: -1,
      onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
      ...htmlProps,
    };
  },
});

export const PickerBaseTrigger = createComponent({
  as: "button",
  memo: true,
  useHook: usePickerBaseTrigger,
});
