import * as React from "react";
import { useForkRef } from "reakit-utils";
import { mergeProps } from "@react-aria/utils";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";
import {
  useLink,
  AriaLinkOptions as AriaLinkOptionsTypes,
} from "@react-aria/link";

import { INTERACTION_KEYS } from "../interactions/__keys";

export type AriaLinkOptions = BoxOptions & AriaLinkOptionsTypes;

export type AriaLinkHTMLProps = BoxHTMLProps;

export type AriaLinkProps = AriaLinkOptions & AriaLinkHTMLProps;

export const useAriaLink = createHook<AriaLinkOptions, AriaLinkHTMLProps>({
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
