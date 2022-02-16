import { PopoverHTMLProps, PopoverOptions, usePopover } from "reakit";

import { createComponent, createHook } from "../system";

import { PICKER_BASE_CONTENT_KEYS } from "./__keys";
import { PickerBaseStateReturn } from "./PickerBaseState";

export type PickerBaseContentOptions = PopoverOptions &
  Pick<PickerBaseStateReturn, "dialogId">;

export type PickerBaseContentHTMLProps = PopoverHTMLProps;

export type PickerBaseContentProps = PickerBaseContentOptions &
  PickerBaseContentHTMLProps;

export const usePickerBaseContent = createHook<
  PickerBaseContentOptions,
  PickerBaseContentHTMLProps
>({
  name: "PickerBaseContent",
  compose: usePopover,
  keys: PICKER_BASE_CONTENT_KEYS,

  useProps(options, htmlProps) {
    return { id: options.dialogId, ...htmlProps };
  },
});

export const PickerBaseContent = createComponent({
  as: "div",
  memo: true,
  useHook: usePickerBaseContent,
});
