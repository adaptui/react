import { CommandOptions } from "ariakit";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Props } from "ariakit-utils/types";

import { useLink } from "../link";

export const useBreadcrumbLink = createHook<BreadcrumbLinkOptions>(
  ({ isCurrentPage, ...props }) => {
    props = {
      "aria-current": isCurrentPage && "page",
      ...props,
    };

    props = useLink(props);

    return props;
  },
);

export const BreadcrumbLink = createComponent<BreadcrumbLinkOptions>(props => {
  const htmlProps = useBreadcrumbLink(props);

  return createElement("a", htmlProps);
});

export type BreadcrumbLinkOptions<T extends As = "a"> = CommandOptions<T> & {
  /**
   * If true, sets `aria-current: "page"`
   */
  isCurrentPage?: boolean;
};

export type BreadcrumbLinkProps<T extends As = "a"> = Props<
  BreadcrumbLinkOptions<T>
>;
