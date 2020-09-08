import React from "react";
import { useForkRef } from "reakit-utils";
import { useWarning } from "reakit-warning";
import { createComponent, createHook } from "reakit-system";
import { ClickableHTMLProps, ClickableOptions, useClickable } from "reakit";

export type LinkOptions = ClickableOptions & {
  isExternal?: boolean;
};

export type LinkHTMLProps = ClickableHTMLProps;

export type LinkProps = LinkOptions & LinkHTMLProps;

export const useLink = createHook<LinkOptions, LinkHTMLProps>({
  name: "Link",
  compose: useClickable,
  keys: ["isExternal"],

  useOptions(options) {
    return { unstable_clickOnSpace: false, ...options };
  },

  useProps({ isExternal }, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const [role, setRole] = React.useState<"link" | undefined>(undefined);

    React.useEffect(() => {
      const element = ref.current;

      if (!element) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useWarning(
          true,
          "Can't determine whether the element is a native link because `ref` wasn't passed to the component",
          "See https://reakit.io/docs/button",
        );
        return;
      }

      if (element.tagName !== "A") {
        setRole("link");
      }
    }, []);

    let externalLinkProps = {};

    if (isExternal) {
      externalLinkProps = { target: "_blank", rel: "noopener noreferrer" };
    }

    return {
      ref: useForkRef(ref, htmlRef),
      role,
      ...externalLinkProps,
      ...htmlProps,
    };
  },
});

export const Link = createComponent({
  as: "a",
  memo: true,
  useHook: useLink,
});
