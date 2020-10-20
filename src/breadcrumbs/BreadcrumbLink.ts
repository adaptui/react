import { createComponent, createHook } from "reakit-system";

import { BREADCRUMB_LINK_KEYS } from "./__keys";
import { LinkHTMLProps, LinkOptions, useLink } from "../link";

export type BreadcrumbLinkOptions = LinkOptions & {
  /**
   * If true, sets `aria-current: "page"`
   */
  isCurrent?: boolean;
};

export type BreadcrumbLinkHTMLProps = LinkHTMLProps;

export type BreadcrumbLinkProps = BreadcrumbLinkOptions &
  BreadcrumbLinkHTMLProps;

export const useBreadcrumbLink = createHook<
  BreadcrumbLinkOptions,
  BreadcrumbLinkHTMLProps
>({
  name: "BreadcrumbLink",
  compose: useLink,
  keys: BREADCRUMB_LINK_KEYS,

  useProps({ isCurrent }, htmlProps) {
    return { "aria-current": isCurrent && "page", ...htmlProps };
  },
});

export const BreadcrumbLink = createComponent({
  as: "a",
  memo: true,
  useHook: useBreadcrumbLink,
});
