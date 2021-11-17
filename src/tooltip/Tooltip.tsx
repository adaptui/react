import React from "react";
import { createComponent, createHook } from "reakit-system";
import { Portal } from "reakit";

import {
  PopoverHTMLProps,
  PopoverOptions,
  usePopover,
} from "../popover/Popover";

import { TOOLTIP_KEYS } from "./__keys";

export type TooltipOptions = PopoverOptions & {
  /**
   * Whether or not the tooltip should be rendered within `Portal`.
   */
  unstable_portal?: boolean;
};

export type TooltipHTMLProps = PopoverHTMLProps;

export type TooltipProps = TooltipOptions & TooltipHTMLProps;

export const useTooltip = createHook<TooltipOptions, TooltipHTMLProps>({
  name: "Tooltip",
  compose: usePopover,
  keys: TOOLTIP_KEYS,

  useOptions({ unstable_portal = true, ...options }) {
    return { unstable_portal, ...options };
  },

  useProps(options, htmlProps) {
    const {
      style: htmlStyle,
      wrapElement: htmlWrapElement,
      ...restHtmlProps
    } = htmlProps;

    const wrapElement = React.useCallback(
      (element: React.ReactNode) => {
        if (options.unstable_portal) {
          element = <Portal>{element}</Portal>;
        }

        if (htmlWrapElement) {
          return htmlWrapElement(element);
        }

        return element;
      },
      [options.unstable_portal, htmlWrapElement],
    );

    return {
      style: {
        pointerEvents: "none",
        ...htmlStyle,
      },
      wrapElement,
      ...restHtmlProps,
    };
  },
});

export const Tooltip = createComponent({
  as: "div",
  memo: true,
  useHook: useTooltip,
});
