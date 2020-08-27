import * as React from "react";
import { useForkRef } from "reakit-utils";
import { createHook, createComponent } from "reakit-system";
import {
  CompositeHTMLProps,
  CompositeOptions,
  useComposite,
  usePopover,
} from "reakit";

import { PICKER_STATE_KEYS } from "./__keys";
import { usePortalShortcut } from "./__utils";
import { PickerStateReturn } from "./PickerState";

export type PickerOptions = CompositeOptions & PickerStateReturn;

export type PickerHTMLProps = CompositeHTMLProps;

export type PickerProps = PickerOptions & PickerHTMLProps;

const usePickerListBox = createHook<PickerOptions, PickerHTMLProps>({
  name: "usePickerListBox",
  compose: [usePopover, useComposite],
  keys: PICKER_STATE_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);

    usePortalShortcut(ref, options);

    React.useEffect(() => {
      if (options.selectedValue && options.values) {
        const selectedValue = options.values.find(
          value => value.value === options.selectedValue,
        );

        if (selectedValue?.id) {
          options.move?.(selectedValue.id);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.selectedValue, options.values, options.move, options.visible]);

    return {
      ref: useForkRef(ref, htmlRef),
      role: "listbox",
      ...htmlProps,
    };
  },
});

export const PickerListBox = createComponent({
  as: "div",
  memo: true,
  useHook: usePickerListBox,
});
