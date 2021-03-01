import React from "react";
import { kebabCase } from "lodash";

import "../src/toast/stories/tailwind.css";

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
    return <Story />;
  },
];
