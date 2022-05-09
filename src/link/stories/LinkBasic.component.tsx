import * as React from "react";

import { Link, LinkProps } from "../../index";

export type LinkBasicProps = LinkProps & {};

export const LinkBasic: React.FC<LinkBasicProps> = props => {
  return <Link {...props} />;
};

export default LinkBasic;
