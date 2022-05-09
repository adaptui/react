import * as React from "react";

import { Link, LinkProps } from "../../index";

export type LinkSpanProps = LinkProps & {};

export const LinkSpan: React.FC<LinkSpanProps> = props => {
  return <Link as="span" {...props} />;
};

export default LinkSpan;
