import React from "react";
import { kebabCase } from "lodash";
import { addDecorator } from "@storybook/react";
import { withPropsTable } from "storybook-addon-react-docgen";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    passArgsFirst: true,
    expanded: true,
    hideNoControlsWarning: true,
  },
};

export const decorators = [
  (Story, context) => {
    document.body.id = kebabCase(context.kind);
    document.body.classList.add("font-sans");

    return <Story />;
  },
];

addDecorator(withPropsTable);
