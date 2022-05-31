const yaml = require("yaml");
const fetch = require("node-fetch");
const { outdent } = require("outdent");
const { joinCwd, extractCode } = require("./common-utils");

// eslint-disable-next-line no-useless-escape
const CODESANDBOX_REGEX = /\<\!\-\- CODESANDBOX[\s\S]*?.*\-\-\>/gm;
const CODESANDBOX_GLOBAL_FLAG = new RegExp(CODESANDBOX_REGEX.source, "gm");
const CODESANDBOX_REPLACE_FLAG = new RegExp(CODESANDBOX_REGEX.source, "m");

const injectCsbLinks = async docsTemplate => {
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

module.exports = injectCsbLinks;

const getSandboxShortURL = async parsed => {
  const body = getSandboxContents(
    {
      js: parsed.js ? extractCode(joinCwd(parsed.js)) : undefined,
      css: parsed.css ? extractCode(joinCwd(parsed.css)) : undefined,
      utils: parsed.utils ? extractCode(joinCwd(parsed.utils)) : undefined,
    },
    parsed.deps && parsed.deps,
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

const getSandboxContents = (files, extraDeps) => {
  const deps = {
    "@adaptui/react": "latest",
    react: "^16.8.0",
    "react-dom": "^16.8.0",
    "react-scripts": "^3.4.3",
    ...(extraDeps &&
      extraDeps.reduce((curr, next) => {
        return { ...curr, ...resolveVersion(next) };
      }, {})),
  };

  return JSON.stringify({
    files: {
      "src/index.js": {
        content: outdent`
          import * as ReactDOM from "react-dom";
          import * as React from "react";
          import App from "./App";
          import "./styles.css";

          const rootElement = document.getElementById("root");
          ReactDOM.render(<App />, rootElement);
        `,
      },
      "src/App.js": { content: files.js || "" },
      "src/styles.css": { content: files.css || "" },
      "src/Utils.component.js": files.utils && {
        content: files.utils,
      },
      "package.json": {
        content: { dependencies: { ...deps } },
      },
    },
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
