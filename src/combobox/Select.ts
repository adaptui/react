import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";
import * as React from "react";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { useForkRef } from "reakit-utils/useForkRef";
import { createComponent, createHook } from "reakit-system";

import { SELECT_KEYS } from "./__keys";
import { SelectStateReturn } from "./SelectState";

export const useSelect = createHook<SelectOptions, SelectHTMLProps>({
  name: "Select",
  compose: useButton,
  keys: SELECT_KEYS,

  useOptions({ menuRole = "listbox", hideOnEsc = true, ...options }) {
    return { menuRole, hideOnEsc, ...options };
  },

  useProps(options, { ref: htmlRef, onClick: htmlOnClick, ...htmlProps }) {
    const ref = React.useRef<HTMLInputElement>(null);
    const onClickRef = useLiveRef(htmlOnClick);

    const onClick = React.useCallback(
      (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;
        options.show?.();
      },
      [options.show, options.setCurrentId],
    );

    return {
      ref: useForkRef(ref, useForkRef(options.unstable_referenceRef, htmlRef)),
      "aria-haspopup": options.menuRole,
      "aria-expanded": options.visible,
      onClick,
      ...htmlProps,
    };
  },
});

export const Select = createComponent({
  as: "button",
  memo: true,
  useHook: useSelect,
});

export type SelectOptions = ButtonOptions &
  SelectStateReturn & {
    /**
     * When enabled, user can hide the select popover by pressing
     * `esc` while focusing on the select input.
     * @default true
     */
    hideOnEsc?: boolean;
  };

export type SelectHTMLProps = ButtonHTMLProps;

export type SelectProps = SelectOptions & SelectHTMLProps;
