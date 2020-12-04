const fs = require("fs");
const path = require("path");
const yaml = require("yaml");
const axios = require("axios");
const { outdent } = require("outdent");
const { getParameters } = require("codesandbox/lib/api/define");

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
      const linkTitle = parsed.link_title || "Open On CodeSandbox";

      const sandboxLink = await getSandboxShortURL(parsed);
      return { sandboxLink, linkTitle };
    } catch (e) {
      console.log(e);
    }
  });

  const result = await Promise.allSettled(promises);
  result.forEach(({ value: { sandboxLink, linkTitle } }) => {
    docsTemplate = docsTemplate.replace(
      CODESANDBOX_REPLACE_FLAG,
      `[${linkTitle}](${sandboxLink})`,
    );
  });

  return docsTemplate;
};

module.exports = injectCsbLinks;

const getSandboxShortURL = async parsed => {
  const defineLink = getSandboxDefineLink(
    {
      js: readFile(parsed.js),
      css: readFile(parsed.css),
      utils: readFile(parsed.utils),
    },
    parsed.deps && parsed.deps,
  );

  // fetching the sandbox_id, otherwise the URL would be longer
  const response = await axios.get(`${defineLink}&json=1`);
  const sandboxLink = `https://codesandbox.io/s/${response.data.sandbox_id}`;

  return sandboxLink;
};

const getSandboxDefineLink = (files, extraDeps) => {
  const deps = {
    reakit: "latest",
    "@renderlesskit/react": "latest",
    react: "^16.8.0",
    "react-dom": "^16.8.0",
    "react-scripts": "^3.4.3",
    ...(extraDeps &&
      extraDeps.reduce((curr, next) => {
        return { ...curr, ...resolveVersion(next) };
      }, {})),
  };

  const parameters = getParameters({
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

  return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
};

const readFile = url => {
  try {
    return fs.readFileSync(path.join(process.cwd(), url), {
      encoding: "utf-8",
    });
  } catch (er) {
    return;
  }
};

const resolveVersion = userModule => {
  const packageDendencies = {};
  const result = /^(@*[^@]+)@*([^@/]+)*$/g.exec(userModule);
  const name = result ? result[1] : userModule;
  const version = result && result[2] ? result[2] : "latest";
  packageDendencies[name] = version;
  return packageDendencies;
};
