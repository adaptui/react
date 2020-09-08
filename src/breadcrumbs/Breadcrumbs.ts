import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

export type BreadcrumbsOptions = BoxOptions;

export type BreadcrumbsHTMLProps = BoxHTMLProps;

export type BreadcrumbProps = BreadcrumbsOptions & BreadcrumbsHTMLProps;

export const useBreadcrumbs = createHook<
  BreadcrumbsOptions,
  BreadcrumbsHTMLProps
>({
  name: "Breadcrumb",
  compose: useBox,

  useProps(_, htmlProps) {
    return { "aria-label": "Breadcrumb", ...htmlProps };
  },
});

export const Breadcrumbs = createComponent({
  as: "nav",
  memo: true,
  useHook: useBreadcrumbs,
});
