import {
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
  const deps = ["renderless-components@0.1.1-alpha.6", ...extraDeps];
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
