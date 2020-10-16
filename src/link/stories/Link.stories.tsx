import React from "react";
import { Meta } from "@storybook/react";

import { Link } from "../Link";

export default {
  title: "Link",
} as Meta;

export const Default = () => {
  return <Link>Reakit</Link>;
};

export const LinkWithHref = () => {
  return <Link href="#">Reakit</Link>;
};

export const ExternalLink = () => {
  return (
    <Link href="https://reakit.io/" isExternal>
      Reakit
    </Link>
  );
};

export const SpanLink = () => {
  return (
    <Link as="span" onClick={() => alert("Custom Link")}>
      Reakit
    </Link>
  );
};

export const DisabledExternalLink = () => {
  return (
    <Link href="https://reakit.io/" isExternal disabled>
      Reakit
    </Link>
  );
};

export const DisabledSpanLink = () => {
  return (
    <Link as="span" onClick={() => alert("Custom Link")} disabled>
      Reakit
    </Link>
  );
};
