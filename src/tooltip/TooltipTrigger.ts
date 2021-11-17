import * as React from "react";
import { createComponent, createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { useLiveRef } from "reakit-utils";

import { TOOLTIP_TRIGGER_KEYS } from "./__keys";
import { TooltipStateReturn } from "./TooltipState";

export type TooltipTriggerOptions = RoleOptions &
  Pick<Partial<TooltipStateReturn>, "baseId"> &
  Pick<TooltipStateReturn, "show" | "hide">;

export type TooltipTriggerHTMLProps = RoleHTMLProps;

export type TooltipTriggerProps = TooltipTriggerOptions &
  TooltipTriggerHTMLProps;

export const useTooltipTrigger = createHook<
  TooltipTriggerOptions,
  TooltipTriggerHTMLProps
>({
  name: "TooltipTrigger",
  compose: useRole,
  keys: TOOLTIP_TRIGGER_KEYS,

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
    const onFocusRef = useLiveRef(htmlOnFocus);
    const onBlurRef = useLiveRef(htmlOnBlur);
    const onMouseEnterRef = useLiveRef(htmlOnMouseEnter);
    const onMouseLeaveRef = useLiveRef(htmlOnMouseLeave);

    const onFocus = React.useCallback(
      (event: React.FocusEvent) => {
        onFocusRef.current?.(event);
        if (event.defaultPrevented) return;
        options.show?.();
      },
      [options.show],
    );

    const onBlur = React.useCallback(
      (event: React.FocusEvent) => {
        onBlurRef.current?.(event);
        if (event.defaultPrevented) return;
        options.hide?.();
      },
      [options.hide],
    );

    const onMouseEnter = React.useCallback(
      (event: React.MouseEvent) => {
        onMouseEnterRef.current?.(event);
        if (event.defaultPrevented) return;
        options.show?.();
      },
      [options.show],
    );

    const onMouseLeave = React.useCallback(
      (event: React.MouseEvent) => {
        onMouseLeaveRef.current?.(event);
        if (event.defaultPrevented) return;
        options.hide?.();
      },
      [options.hide],
    );

    return {
      tabIndex: 0,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      "aria-describedby": options.baseId,
      ...htmlProps,
    };
  },
});

export const TooltipTrigger = createComponent({
  as: "div",
  useHook: useTooltipTrigger,
});
