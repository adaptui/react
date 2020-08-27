import * as React from "react";
import { hasFocusWithin, useLiveRef } from "reakit-utils";
import { createHook, createComponent } from "reakit-system";
import {
  CompositeItemHTMLProps,
  CompositeItemOptions,
  useCompositeItem,
} from "reakit";

import { PICKER_STATE_KEYS } from "./__keys";
import { PickerStateReturn } from "./PickerState";

export type PickerItemOptions = CompositeItemOptions &
  PickerStateReturn & {
    /**
     * Same as the `value` attribute.
     */
    value: string | number;
  };

export type PickerItemHTMLProps = CompositeItemHTMLProps &
  React.InputHTMLAttributes<any>;

export type PickerItemProps = PickerItemOptions & PickerItemHTMLProps;

const usePickerItem = createHook<PickerItemOptions, PickerItemHTMLProps>({
  name: "usePickerItem",
  compose: useCompositeItem,
  keys: PICKER_STATE_KEYS,

  useOptions(options, { value }) {
    return { ...options, value: options.value ?? value };
  },

  useProps(
    options,
    { onMouseMove: htmlOnMouseMove, onClick: htmlOnClick, ...htmlProps },
  ) {
    const onMouseMoveRef = useLiveRef(htmlOnMouseMove);
    const onClickRef = useLiveRef(htmlOnClick);

    const onMouseMove = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onMouseMoveRef.current?.(event);
        if (event.defaultPrevented) return;
        if (options.disabled) return;
        if (hasFocusWithin(event.currentTarget)) return;

        event.currentTarget.focus();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [options.disabled],
    );

    const onClick = React.useCallback(
      (event: React.MouseEvent) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;
        if (options.disabled) return;

        options.setSelectedValue?.(options.value);
        options.hide?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
      [options.setSelectedValue, options.hide, options.disabled, options.value],
    );

    return {
      role: "option",
      onMouseMove,
      onClick,
      ...htmlProps,
    };
  },
});

export const PickerItem = createComponent({
  as: "div",
  memo: true,
  useHook: usePickerItem,
});
