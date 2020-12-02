const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const { outdent } = require("outdent");
const { getParameters } = require("codesandbox/lib/api/define");

const injectMdContent = require("./inject-md-content");

const CODESANDBOX_REGEX = /\<\!\-\- INJECT_CODESANDBOX ?(.*) \-\-\>/m;

const injectCsbLinks = async (docsTemplate, frontMatter) => {
  const lines = docsTemplate.split("\n");

  const linePromises = lines.map(async line => {
    try {
      const match = line.match(CODESANDBOX_REGEX);
      if (match) {
        let type = "codesandbox";
        if (match[1]) {
          type = `codesandbox${match[1]}`;
        }

        const parsed = frontMatter[type];
        const linkTitle = parsed.link_title || "Open On CodeSandbox";
        const sandboxLink = await getSandboxShortURL(parsed);
        return `[${linkTitle}](${sandboxLink})`;
      }

      return line;
    } catch (e) {
      console.log(e);
    }
  });

  const template = await Promise.all(linePromises);
  return template.join("\n");
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
    "renderless-components": "0.1.1-beta.3",
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
      "src/App.js": files.js && { content: files.js },
      "src/styles.css": files.css && { content: files.css },
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
