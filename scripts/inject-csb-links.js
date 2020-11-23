const fs = require("fs");
const path = require("path");
const yaml = require("yaml");
const axios = require("axios");
const chalk = require("chalk");
const { outdent } = require("outdent");
const { getParameters } = require("codesandbox/lib/api/define");
const { walkSync, createFile } = require("./fsUtils");

const resolveVersion = userModule => {
  const packageDendencies = {};
  const result = /^(@*[^@]+)@*([^@/]+)*$/g.exec(userModule);
  const name = result ? result[1] : userModule;
  const version = result && result[2] ? result[2] : "latest";
  packageDendencies[name] = version;
  return packageDendencies;
};

const getCSBLink = (files, extraDeps) => {
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

  const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;

  return url;
};

// TODO: Support multiple sandbox links
const CODESANDBOX_FLAG = /\<\!\-\- CODESANDBOX[\s\S]*?.*\-\-\>/m;
const docsFolder = path.resolve(process.cwd(), "docs");
// const docsTemplateFolder = path.resolve(process.cwd(), "docs-templates");

const readFile = url => {
  try {
    return fs.readFileSync(path.join(process.cwd(), url), {
      encoding: "utf-8",
    });
  } catch (er) {
    return;
  }
};

const readmes = walkSync(docsFolder);

readmes.forEach(async readmePath => {
  let readme = fs.readFileSync(readmePath, { encoding: "utf-8" });
  const fileName = path.basename(readmePath);

  const regexMatched = readme.match(CODESANDBOX_FLAG);
  if (!regexMatched) return;
  try {
    const ymlString = regexMatched[0]
      .replace("<!-- CODESANDBOX", "")
      .replace("-->", "");
    const parsed = yaml.parse(ymlString);
    const linkTitle = parsed.link_title || "Open On CodeSandbox";

    const csbLink = getCSBLink(
      {
        js: readFile(parsed.js),
        css: readFile(parsed.css),
        utils: readFile(parsed.utils),
      },
      parsed.deps && parsed.deps,
    );

    // fetching the sandbox_id, otherwise the URL would be longer
    const response = await axios.get(`${csbLink}&json=1`);
    const sandboxLink = `https://codesandbox.io/s/${response.data.sandbox_id}`;

    readme = readme.replace(CODESANDBOX_FLAG, `[${linkTitle}](${sandboxLink})`);

    console.log(
      chalk.red.yellow(
        `Generating Sandbox Link:`,
        chalk.red.greenBright(fileName),
      ),
    );
    createFile(path.join(docsFolder, fileName), readme);
  } catch (e) {
    console.log(e);
  }
});
