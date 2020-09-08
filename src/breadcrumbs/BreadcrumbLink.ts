import { LinkHTMLProps, LinkOptions, useLink } from "../link";
import { createComponent, createHook } from "reakit-system";

export type BreadcrumbLinkOptions = LinkOptions & {
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
  keys: ["isCurrent"],

  useOptions(options) {
    return { disabled: options.disabled || options.isCurrent, ...options };
  },

  useProps({ isCurrent }, htmlProps) {
    return { "aria-current": isCurrent && "page", ...htmlProps };
  },
});

export const BreadcrumbLink = createComponent({
  as: "a",
  memo: true,
  useHook: useBreadcrumbLink,
});
