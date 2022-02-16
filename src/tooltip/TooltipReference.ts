import * as React from "react";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { useForkRef, useLiveRef } from "reakit-utils";

import { createComponent, createHook } from "../system";

import { TOOLTIP_REFERENCE_KEYS } from "./__keys";
import { TooltipStateReturn } from "./TooltipState";

export type TooltipReferenceOptions = RoleOptions &
  Pick<Partial<TooltipStateReturn>, "setAnchor" | "baseId"> &
  Pick<TooltipStateReturn, "show" | "hide">;

export type TooltipReferenceHTMLProps = RoleHTMLProps;

export type TooltipReferenceProps = TooltipReferenceOptions &
  TooltipReferenceHTMLProps;

export const useTooltipReference = createHook<
  TooltipReferenceOptions,
  TooltipReferenceHTMLProps
>({
  name: "TooltipReference",
  compose: useRole,
  keys: TOOLTIP_REFERENCE_KEYS,

  useProps(
    options,
    {
      ref: htmlRef,
      onFocus: htmlOnFocus,
      onBlur: htmlOnBlur,
      onMouseEnter: htmlOnMouseEnter,
      onMouseLeave: htmlOnMouseLeave,
      ...htmlProps
    },
  ) {
    const { show, hide, baseId, setAnchor } = options;
    const onFocusRef = useLiveRef(htmlOnFocus);
    const onBlurRef = useLiveRef(htmlOnBlur);
    const onMouseEnterRef = useLiveRef(htmlOnMouseEnter);
    const onMouseLeaveRef = useLiveRef(htmlOnMouseLeave);

    const onFocus = React.useCallback(
      (event: React.FocusEvent) => {
        onFocusRef.current?.(event);
        if (event.defaultPrevented) return;
        show?.();
      },
      [onFocusRef, show],
    );

    const onBlur = React.useCallback(
      (event: React.FocusEvent) => {
        onBlurRef.current?.(event);
        if (event.defaultPrevented) return;
        hide?.();
      },
      [hide, onBlurRef],
    );

    const onMouseEnter = React.useCallback(
      (event: React.MouseEvent) => {
        onMouseEnterRef.current?.(event);
        if (event.defaultPrevented) return;
        show?.();
      },
      [onMouseEnterRef, show],
    );

    const onMouseLeave = React.useCallback(
      (event: React.MouseEvent) => {
        onMouseLeaveRef.current?.(event);
        if (event.defaultPrevented) return;
        hide?.();
      },
      [hide, onMouseLeaveRef],
    );

    return {
      ref: useForkRef(setAnchor, htmlRef),
      tabIndex: 0,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      "aria-describedby": baseId,
      ...htmlProps,
    };
  },
});

export const TooltipReference = createComponent({
  as: "div",
  useHook: useTooltipReference,
});
