import * as React from "react";

import { Link, LinkProps } from "../../index";

export type LinkBasicProps = LinkProps & {};

export const LinkBasic: React.FC<LinkBasicProps> = props => {
  return (
    <Link href="https://timeless.co/" isExternal {...props}>
      Timeless
    </Link>
  );
};

export default LinkBasic;
