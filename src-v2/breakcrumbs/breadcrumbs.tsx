import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

export const useBreadcrumbs = createHook<BreadcrumbsOptions>(({ ...props }) => {
  props = {
    "aria-label": "breadcrumbs",
    ...props,
  };

  return props;
});

export const Breadcrumbs = createComponent<BreadcrumbsOptions>(props => {
  const htmlProps = useBreadcrumbs(props);

  return createElement("nav", htmlProps);
});

export type BreadcrumbsOptions<T extends As = "nav"> = Options<T> & {};

export type BreadcrumbsProps<T extends As = "nav"> = Props<
  BreadcrumbsOptions<T>
>;
