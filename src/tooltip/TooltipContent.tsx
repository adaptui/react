import * as React from "react";
import { getDocument, useForkRef } from "reakit-utils";

import {
  DisclosureContentHTMLProps,
  DisclosureContentOptions,
  useDisclosureContent,
} from "../disclosure/DisclosureContent";
import { createComponent, createHook } from "../system";

import globalState from "./__globalState";
import { TOOLTIP_KEYS } from "./__keys";
import { TooltipStateReturn } from "./TooltipState";

export type TooltipContentOptions = DisclosureContentOptions &
  Pick<Partial<TooltipStateReturn>, "setPopper" | "popper"> & {};

export type TooltipContentHTMLProps = DisclosureContentHTMLProps;

export type TooltipContentProps = TooltipContentOptions &
  TooltipContentHTMLProps;

function globallyHideTooltipContentOnEscape(event: KeyboardEvent) {
  if (event.defaultPrevented) return;
  if (event.key === "Escape") {
    globalState.show(null);
  }
}

export const useTooltipContent = createHook<
  TooltipContentOptions,
  TooltipContentHTMLProps
>({
  name: "TooltipContent",
  compose: useDisclosureContent,
  keys: TOOLTIP_KEYS,

  useOptions(options) {
    return options;
  },

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    React.useEffect(() => {
      const document = getDocument(options.popper);

      document.addEventListener("keydown", globallyHideTooltipContentOnEscape);
    }, [options.popper]);

    return {
      ref: useForkRef(options.setPopper, htmlRef),
      role: "tooltip",
      style: {
        pointerEvents: "none",
        ...htmlStyle,
      },
      ...htmlProps,
    };
  },
});

export const TooltipContent = createComponent({
  as: "div",
  memo: true,
  useHook: useTooltipContent,
});
