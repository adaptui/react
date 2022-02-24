import * as React from "react";
import { CommandOptions, useCommand, useFocusable } from "ariakit";
import { useForkRef, useTagName } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Props } from "ariakit-utils/types";

export const useLink = createHook<LinkOptions>(
  ({ isExternal = false, ...props }) => {
    const ref = React.useRef<HTMLElement>(null);
    const tagName = useTagName(ref, props.as || "a");
    const [isNativeLink, setIsNativeLink] = React.useState(
      () => !!tagName && isLink({ tagName }),
    );

    React.useEffect(() => {
      if (!ref.current) return;

      setIsNativeLink(isLink(ref.current));
    }, []);

    props = {
      role: !isNativeLink && tagName !== "a" ? "link" : undefined,
      ...(isExternal && { target: "_blank", rel: "noopener noreferrer" }),
      ...props,
      ref: useForkRef(ref, props.ref),
    };

    props = useCommand({ clickOnSpace: false, ...props });

    return props;
  },
);

export const Link = createComponent<LinkOptions>(props => {
  const htmlProps = useLink(props);

  return createElement("a", htmlProps);
});

export type LinkOptions<T extends As = "a"> = CommandOptions<T> & {
  /**
   * Opens the link in a new tab
   * @default false
   */
  isExternal?: boolean;
};

export type LinkProps<T extends As = "a"> = Props<LinkOptions<T>>;

export function isLink(element: { tagName: string }) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "a") return true;

  return false;
}
