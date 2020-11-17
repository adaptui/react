import {
  CodeSandboxTemplate,
  DEFAULT_REACT_CODESANDBOX,
  DEFAULT_REACTJS_CODESANDBOX,
} from "storybook-addon-preview";

interface Props {
  js?: string;
  ts?: string;
  css?: string;
  deps?: string[];
}

export function createPreviewTabs(props: Props) {
  const { js, ts, css, deps: extraDeps = [] } = props;
  const deps = ["renderless-components@0.1.1-beta.3", "reakit", ...extraDeps];
  const tabs = [];

  if (js) {
    tabs.push({
      tab: "ReactJS",
      template: js,
      language: "jsx",
      copy: true,
      codesandbox: DEFAULT_REACTJS_CODESANDBOX(deps),
    });
  }

  if (ts) {
    tabs.push({
      tab: "React",
      template: ts,
      language: "tsx",
      copy: true,
      codesandbox: DEFAULT_REACT_CODESANDBOX(deps),
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

export const CreateToastSandbox = ({
  type = "tsx",
  deps = [],
}: {
  type?: string;
  deps?: string[];
}) => {
  const utilTab = type === "tsx" ? "Utils.tsx" : "Utils.jsx";
  const ReactTab = type === "tsx" ? "React" : "ReactJS";

  return new Function(`
  var previews = arguments[0];
  return {
      framework: "${ReactTab.toLowerCase()}",
      files: {
          "src/App.${type}": previews["${ReactTab}"][0],
          "src/styles.css": previews["CSS"] ? previews["CSS"][0] : "",
          "src/ToastUtils.component.${type}": previews["${utilTab}"] ? previews["${utilTab}"][0] : "",
      },
      userDependencies: ${joinStrs(deps)},
  };`) as CodeSandboxTemplate;
};
