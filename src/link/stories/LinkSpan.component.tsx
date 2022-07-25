import * as React from "react";

import { Link, LinkProps } from "../../index";

export type LinkSpanProps = LinkProps & {};

export const LinkSpan: React.FC<LinkSpanProps> = props => {
  return (
    <Link
      as="span"
      onClick={(event: React.MouseEvent) =>
        goToLink(event, "https://timeless.co/")
      }
      onKeyDown={(event: React.KeyboardEvent) =>
        goToLink(event, "https://timeless.co/")
      }
      {...props}
    >
      Timeless
    </Link>
  );
};

export default LinkSpan;

function goToLink(event: React.MouseEvent | React.KeyboardEvent, url: string) {
  var type = event.type;

  // @ts-ignore
  if (type === "click" || (type === "keydown" && event.key === "Enter")) {
    window.location.href = url;

    event.preventDefault();
    event.stopPropagation();
  }
}
