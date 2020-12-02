import { createComponent, createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";

export const useBreadcrumbs = createHook<
  BreadcrumbsOptions,
  BreadcrumbsHTMLProps
>({
  name: "Breadcrumb",
  compose: useRole,

  useProps(_, htmlProps) {
    return { "aria-label": "Breadcrumb", ...htmlProps };
  },
});

export const Breadcrumbs = createComponent({
  as: "nav",
  memo: true,
  useHook: useBreadcrumbs,
});

export type BreadcrumbsOptions = RoleOptions;

export type BreadcrumbsHTMLProps = RoleHTMLProps;

export type BreadcrumbProps = BreadcrumbsOptions & BreadcrumbsHTMLProps;
