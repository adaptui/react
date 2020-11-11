import path from "path";
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
  (Story, context) => {
    const filename = context.parameters.fileName;
    const componentName = path.basename(path.dirname(path.dirname(filename)));
    const basename = path.basename(filename, ".stories.tsx");
    const id = `${kebabCase(componentName)}--${kebabCase(basename)}`;
    return (
      <div id={id}>
        <Story />
      </div>
    );
  },
];
