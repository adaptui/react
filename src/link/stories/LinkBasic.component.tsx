import * as React from "react";

import {
  Link as RenderlesskitLink,
  LinkProps as RenderlesskitLinkProps,
} from "../../index";

export type LinkProps = RenderlesskitLinkProps &
  React.AnchorHTMLAttributes<"a"> & {};

export const Link: React.FC<LinkProps> = props => {
  return <RenderlesskitLink {...props}>Reakit</RenderlesskitLink>;
};

export default Link;
