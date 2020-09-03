import * as React from "react";
import { useForkRef } from "reakit-utils";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { useLink, AriaLinkOptions } from "@react-aria/link";
import { createComponent, createHook } from "reakit-system";

import { INTERACTION_KEYS } from "../interactions/__keys";

export type AriaLinkHTMLProps = BoxHTMLProps;

export type AriaLinkProps = AriaLinkOptions & AriaLinkHTMLProps;

export const useAriaLink = createHook<AriaLinkOptions, BoxHTMLProps>({
  name: "AriaLink",
  compose: useBox,
  keys: INTERACTION_KEYS,

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const props = { ...options, ...htmlProps };
    const ref = React.useRef<HTMLElement>(null);

    const { linkProps } = useLink(props, ref);

    return mergeProps(
      {
        ...linkProps,
        ref: useForkRef(ref, htmlRef),
      },
      htmlProps,
    );
  },
});

export const AriaLink = createComponent({
  as: "a",
  memo: true,
  useHook: useAriaLink,
});
