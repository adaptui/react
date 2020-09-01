import * as React from "react";
import { useForkRef } from "reakit-utils";
import { useLink, AriaLinkOptions } from "@react-aria/link";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { INTERACTION_KEYS } from "../interactions/__keys";
import { createComponent, createHook } from "reakit-system";

export const useAriaLink = createHook<AriaLinkOptions, BoxHTMLProps>({
  name: "AriaLink",
  keys: INTERACTION_KEYS,
  compose: [useBox],

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const props = { ...options, ...htmlProps };
    const ref = React.useRef<HTMLElement>(null);

    const { linkProps } = useLink(props, ref);

    return mergeProps(htmlProps, {
      ...linkProps,
      ref: useForkRef(ref, htmlRef),
    });
  },
});

export const AriaLink = createComponent({
  as: "a",
  memo: true,
  useHook: useAriaLink,
});
