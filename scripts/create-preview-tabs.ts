import { CodeSandboxTemplate } from "storybook-addon-preview";

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
  const deps = ["renderless-components@0.1.1-beta.3", "reakit", ...extraDeps];
  const tabs = [];

  if (js) {
    tabs.push({
      tab: "ReactJS",
      template: js,
      language: "jsx",
      copy: true,
      codesandbox: REACTJS_CUSTOM_CODESANDBOX(deps),
    });
  }

  if (jsUtils) {
    tabs.push({
      tab: "UtilsJS",
      template: jsUtils,
      language: "jsx",
      copy: true,
      codesandbox: REACTJS_CUSTOM_CODESANDBOX(deps),
    });
  }

  if (ts) {
    tabs.push({
      tab: "React",
      template: ts,
      language: "tsx",
      copy: true,
      codesandbox: REACT_CUSTOM_CODESANDBOX(deps),
    });
  }

  if (tsUtils) {
    tabs.push({
      tab: "Utils",
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
        "src/App.js": previews["ReactJS"][0],
        "src/styles.css": previews["CSS"] ? previews["CSS"][0] : "",
        "src/Utils.component.js": previews["UtilsJS"] ? previews["UtilsJS"][0] : "",
    },
    userDependencies: ${joinStrs(dependencies)},
};`) as CodeSandboxTemplate;

const REACT_CUSTOM_CODESANDBOX = (dependencies: string[]) =>
  new Function(`
var previews = arguments[0];
return {
    framework: "react",
    files: {
        "src/App.tsx": previews["React"][0],
        "src/styles.css": previews["CSS"] ? previews["CSS"][0] : "",
        "src/Utils.component.tsx": previews["Utils"] ? previews["Utils"][0] : "",
    },
    userDependencies: ${joinStrs(dependencies)},
};`) as CodeSandboxTemplate;
