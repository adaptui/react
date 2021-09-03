import * as React from "react";

import { Link as RenderlesskitLink, LinkProps } from "../../index";

export const Link: React.FC<LinkProps> = props => {
  return <RenderlesskitLink {...props}>Reakit</RenderlesskitLink>;
};

export default Link;
