/* eslint-disable no-new-func */
import { CodeSandboxTemplate } from "storybook-addon-preview";

type CreateControlsOptions = {
  unions?: string[];
  ignore?: string[];
  allow?: string[];
};

export const createControls = (options?: CreateControlsOptions) => {
  try {
    const ignoredControls = (options?.ignore || []).reduce((cur, key) => {
      return {
        ...cur,
        [key]: { table: { disable: true } },
      };
    }, {});

    const allowedControls = (options?.allow || []).reduce((cur, key) => {
      return {
        ...cur,
        [key]: { table: { disable: true } },
      };
    }, {});

    return { ...ignoredControls, ...allowedControls };
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  js?: string;
  ts?: string;
  jsUtils?: string;
  tsUtils?: string;
  css?: string;
  deps?: string[];
  jsSandbox?: CodeSandboxTemplate;
  tsSandbox?: CodeSandboxTemplate;
}

export function createPreviewTabs(props: Props) {
  const { js, ts, jsUtils, tsUtils, css, deps: extraDeps = [] } = props;
  const deps = ["@renderlesskit/react@latest", "reakit@latest", ...extraDeps];
  const tabs = [];

  if (js) {
    tabs.push({
      tab: "JSX",
      template: js,
      language: "jsx",
      copy: true,
      codesandbox: REACTJS_CUSTOM_CODESANDBOX(deps),
    });
  }

  if (jsUtils) {
    tabs.push({
      tab: "UtilsJSX",
      template: jsUtils,
      language: "jsx",
      copy: true,
      codesandbox: REACTJS_CUSTOM_CODESANDBOX(deps),
    });
  }

  if (ts) {
    tabs.push({
      tab: "TSX",
      template: ts,
      language: "tsx",
      copy: true,
      codesandbox: REACT_CUSTOM_CODESANDBOX(deps),
    });
  }

  if (tsUtils) {
    tabs.push({
      tab: "UtilsTSX",
      template: tsUtils,
      language: "tsx",
      copy: true,
      codesandbox: REACT_CUSTOM_CODESANDBOX(deps),
    });
  }

  if (css) {
    tabs.push({
      tab: "CSS",
      template: css,
      language: "css",
      copy: true,
    });
  }

  return tabs;
}

const joinStrs = (strs: string[]) => {
  return `[${strs.map(str => `"${str}"`).join(", ")}]`;
};

const REACTJS_CUSTOM_CODESANDBOX = (dependencies: string[]) =>
  new Function(`
var previews = arguments[0];
return {
    framework: "reactjs",
    files: {
        "src/App.js": previews["JSX"][0],
        "src/styles.css": previews["CSS"] ? previews["CSS"][0] : "",
        ...(previews["UtilsJS"] ? {"src/Utils.component.js": previews["UtilsJSX"][0]} : {}),
    },
    userDependencies: ${joinStrs(dependencies)},
};`) as CodeSandboxTemplate;

const REACT_CUSTOM_CODESANDBOX = (dependencies: string[]) =>
  new Function(`
var previews = arguments[0];
return {
    framework: "react",
    files: {
        "src/App.tsx": previews["TSX"][0],
        "src/styles.css": previews["CSS"] ? previews["CSS"][0] : "",
        ...(previews["Utils"] ? {"src/Utils.component.tsx": previews["UtilsTSX"][0]} : {}),
    },
    userDependencies: ${joinStrs(dependencies)},
};`) as CodeSandboxTemplate;
