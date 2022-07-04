import React from "react";
import { kebabCase } from "lodash";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    passArgsFirst: true,
    expanded: true,
    hideNoControlsWarning: true,
  },
};

export const decorators = [
  (Story: any, context: any) => {
    document.body.id = kebabCase(context.kind);
    document.body.classList.add("font-sans");
    document.body.classList.add("antialiased");

    return <Story />;
  },
];
