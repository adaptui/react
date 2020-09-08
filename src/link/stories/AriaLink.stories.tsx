import React from "react";
import { Meta } from "@storybook/react";

import { AriaLink } from "../index";

export default {
  title: "Component/Link/Aria",
} as Meta;

export const ReactAriaLink = () => {
  return (
    <AriaLink
      href="https://adobe.com"
      target="_blank"
      style={{
        color: "blue",
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      Adobe
    </AriaLink>
  );
};

export const ReactAriaCustomLink = () => {
  return (
    <AriaLink
      as="span"
      elementType="span"
      style={{
        color: "blue",
        textDecoration: "underline",
        cursor: "pointer",
      }}
      onPress={() => alert("Pressed link")}
    >
      Custom
    </AriaLink>
  );
};

export const ReactAriaDisabledLink = () => {
  return (
    <AriaLink
      href="https://adobe.com"
      target="_blank"
      style={{
        color: "blue",
        textDecoration: "underline",
        cursor: "pointer",
      }}
      onPress={() => alert("Pressed link")}
      isDisabled
    >
      Adobe
    </AriaLink>
  );
};
