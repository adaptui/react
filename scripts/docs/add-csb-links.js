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
  const files = {};

  if (parsed.js) {
    files["src/App.js"] = extractCode(joinCwd(parsed.js));
  }
  if (parsed.tsx) {
    files["src/App.tsx"] = extractCode(joinCwd(parsed.tsx));
  }
  if (parsed.css) {
    files["src/styles.css"] = extractCode(joinCwd(parsed.css));
  }

  const replacer = (match, p1, p2) => {
    return `src/${p1}.component.${p2.toLowerCase()}sx`;
  };

  if (parsed.files) {
    parsed.files.forEach(file => {
      const fileName = file.replace(/.+\/templates\/(.+)(J|T)sx\.ts/, replacer);
      files[fileName] = extractCode(joinCwd(file));
    });
  }

  const linkTitle = parsed.link_title;

  let body = "";

  if (Object.keys(parsed).includes("js")) {
    body = getJSSandboxContents(files, parsed.deps && parsed.deps, linkTitle);
  } else {
    body = getTSSandboxContents(files, parsed.deps && parsed.deps, linkTitle);
  }

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

const getJSSandboxContents = (files, extraDeps, linkTitle) => {
  const deps = {
    "@adaptui/react": "1.0.0-alpha.7",
    react: "18.2.0",
    "react-dom": "18.2.0",
    "react-scripts": "5.0.1",
    ...(extraDeps &&
      extraDeps.reduce((curr, next) => {
        return { ...curr, ...resolveVersion(next) };
      }, {})),
  };
  const description = `AdaptUI ${linkTitle} React Typescript example`;

  const finalFiles = Object.keys(files).reduce((acc, curr) => {
    return { ...acc, [curr]: { content: files[curr] } };
  }, {});

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
      ...finalFiles,
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
            "@babel/runtime": "7.18.9",
            typescript: "4.7.4",
          },
        },
      },
    },
    template: "create-react-app",
  });
};

const getTSSandboxContents = (files, extraDeps, linkTitle) => {
  const deps = {
    "@adaptui/react": "1.0.0-alpha.7",
    react: "18.2.0",
    "react-dom": "18.2.0",
    "react-scripts": "5.0.1",
    ...(extraDeps &&
      extraDeps.reduce((curr, next) => {
        return { ...curr, ...resolveVersion(next) };
      }, {})),
  };
  const description = `AdaptUI ${linkTitle} React Javascript example`;

  const finalFiles = Object.keys(files).reduce((acc, curr) => {
    return { ...acc, [curr]: { content: files[curr] } };
  }, {});

  return JSON.stringify({
    files: {
      "src/index.tsx": {
        content: outdent`
          import { createRoot } from "react-dom/client";

          import App from "./App";
          import "./styles.css";

          const rootElement = document.getElementById("root");
          const root = createRoot(rootElement);

          root.render(<App />);
        `,
      },
      "src/App.tsx": { content: files.tsx || "" },
      "src/styles.css": { content: files.css || "" },
      ...finalFiles,
      "package.json": {
        content: {
          name: linkTitle,
          version: "1.0.0",
          description: description,
          main: "src/index.tsx",
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
            "@babel/runtime": "7.18.9",
            typescript: "4.7.4",
            "@types/react": "18.0.15",
            "@types/react-dom": "18.0.6",
          },
        },
      },
    },
    template: "create-react-app-typescript",
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
