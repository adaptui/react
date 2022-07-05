const yaml = require("yaml");
const fetch = require("node-fetch");
const { outdent } = require("outdent");

const { joinCwd, extractCode } = require("../utils/common-utils");

// eslint-disable-next-line no-useless-escape
const CODESANDBOX_REGEX = /\<\!\-\- CODESANDBOX[\s\S]*?.*\-\-\>/gm;
const CODESANDBOX_GLOBAL_FLAG = new RegExp(CODESANDBOX_REGEX.source, "gm");
const CODESANDBOX_REPLACE_FLAG = new RegExp(CODESANDBOX_REGEX.source, "m");

const addCsbLinks = async docsTemplate => {
  const regexMatched = docsTemplate.match(CODESANDBOX_GLOBAL_FLAG);
  if (!regexMatched) return docsTemplate;

  const promises = regexMatched.map(async match => {
    try {
      const ymlString = match
        .replace("<!-- CODESANDBOX", "")
        .replace("-->", "");
      const parsed = yaml.parse(ymlString);
      const linkTitle = parsed.link_title.split(" ").join("%20");
      const sandboxLink = await getSandboxShortURL(parsed);

      return { sandboxLink, linkTitle };
    } catch (error) {
      console.log(error);
    }
  });

  const result = await Promise.allSettled(promises);

  result.forEach(({ value: { sandboxLink, linkTitle } }) => {
    docsTemplate = docsTemplate.replace(
      CODESANDBOX_REPLACE_FLAG,
      `[![Edit CodeSandbox](https://img.shields.io/badge/${linkTitle}-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](${sandboxLink})`,
    );
  });

  return docsTemplate;
};

module.exports = { addCsbLinks };

const getSandboxShortURL = async parsed => {
  const linkTitle = parsed.link_title;
  const body = getSandboxContents(
    {
      js: parsed.js ? extractCode(joinCwd(parsed.js)) : undefined,
      css: parsed.css ? extractCode(joinCwd(parsed.css)) : undefined,
      utils: parsed.utils ? extractCode(joinCwd(parsed.utils)) : undefined,
    },
    parsed.deps && parsed.deps,
    linkTitle,
  );

  // fetching the sandbox_id, otherwise the URL would be longer
  const response = await fetch(
    "https://codesandbox.io/api/v1/sandboxes/define?json=1",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    },
  );
  const json = await response.json();
  const sandboxLink = `https://codesandbox.io/s/${json.sandbox_id}`;

  return sandboxLink;
};

const getSandboxContents = (files, extraDeps, linkTitle) => {
  const deps = {
    "@adaptui/react": "alpha",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1",
    ...(extraDeps &&
      extraDeps.reduce((curr, next) => {
        return { ...curr, ...resolveVersion(next) };
      }, {})),
  };
  const description = `AdaptUI ${linkTitle} example`;

  return JSON.stringify({
    files: {
      "src/index.js": {
        content: outdent`
          import { createRoot } from "react-dom/client";

          import App from "./App";
          import "./styles.css";

          const rootElement = document.getElementById("root");
          const root = createRoot(rootElement);

          root.render(<App />);
        `,
      },
      "src/App.js": { content: files.js || "" },
      "src/styles.css": { content: files.css || "" },
      ...(files.utils
        ? { "src/Utils.component.js": { content: files.utils } }
        : {}),
      "package.json": {
        content: {
          name: linkTitle,
          version: "1.0.0",
          description: description,
          main: "src/index.js",
          scripts: {
            start: "react-scripts start",
            build: "react-scripts build",
            test: "react-scripts test --env=jsdom",
            eject: "react-scripts eject",
          },
          browserslist: [
            ">0.2%",
            "not dead",
            "not ie <= 11",
            "not op_mini all",
          ],
          dependencies: { ...deps },
          devDependencies: {
            "@babel/runtime": "7.13.8",
            typescript: "4.1.3",
          },
        },
      },
    },
    template: "create-react-app",
  });
};

const resolveVersion = userModule => {
  const packageDendencies = {};
  const result = /^(@*[^@]+)@*([^@/]+)*$/g.exec(userModule);
  const name = result ? result[1] : userModule;
  const version = result && result[2] ? result[2] : "latest";
  packageDendencies[name] = version;
  return packageDendencies;
};
