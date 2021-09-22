import { createComponent, createHook, useCreateElement } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { useWarning } from "reakit-warning";

export const useBreadcrumbs = createHook<
  BreadcrumbsOptions,
  BreadcrumbsHTMLProps
>({
  name: "Breadcrumb",
  compose: useRole,
});

export const Breadcrumbs = createComponent({
  as: "nav",
  memo: true,
  useHook: useBreadcrumbs,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://www.w3.org/TR/wai-aria-practices-1.1/#wai-aria-roles-states-and-properties-2",
    );
    return useCreateElement(type, props, children);
  },
});

export type BreadcrumbsOptions = RoleOptions;

export type BreadcrumbsHTMLProps = RoleHTMLProps;

export type BreadcrumbProps = BreadcrumbsOptions & BreadcrumbsHTMLProps;
