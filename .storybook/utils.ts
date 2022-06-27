/* eslint-disable no-new-func */
import { CodeSandboxTemplate } from "storybook-addon-preview";
import outdent from "outdent";

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

interface FilesProp {
  [index: string]: string;
}
interface Props {
  js?: { template: string; files?: FilesProp };
  ts?: { template: string; files?: FilesProp };
  jsUtils?: string;
  tsUtils?: string;
  css?: string;
  deps?: string[];
}

export function createPreviewTabs(props: Props) {
  const { js, ts, jsUtils, tsUtils, css, deps: extraDeps = [] } = props;
  const tabs = [];

  if (js) {
    tabs.push({
      tab: "JSX",
      template: js.template,
      language: "jsx",
      copy: true,
      codesandbox: REACTJS_CUSTOM_CODESANDBOX([...extraDeps], {
        "src/components/index.js": js.template,
        ...(js.files && js.files),
      }),
    });
  }

  if (jsUtils) {
    tabs.push({
      tab: "UtilsJSX",
      template: jsUtils,
      language: "jsx",
      copy: true,
    });
  }

  if (ts) {
    tabs.push({
      tab: "TSX",
      template: ts.template,
      language: "tsx",
      copy: true,
      codesandbox: REACT_CUSTOM_CODESANDBOX([...extraDeps], {
        "src/components/index.tsx": ts.template,
        ...(ts.files && ts.files),
      }),
    });
  }

  if (tsUtils) {
    tabs.push({
      tab: "UtilsTSX",
      template: tsUtils,
      language: "tsx",
      copy: true,
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
export const REACTJS_CUSTOM_CODESANDBOX: CodeSandboxTemplate = (
  userDependencies = [],
  files = {},
) => {
  return {
    template: "create-react-app",
    files: {
      "public/index.html": `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          <!--
              manifest.json provides metadata used when your web app is added to the
              homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
          -->
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
          <title>React App</title>
      </head>
      <body>
          <noscript>
              You need to enable JavaScript to run this app.
          </noscript>
          <div id="root"></div>
      </body>
      </html>
      `,
      "src/index.js": `
        import App from "./App";
        import { createRoot } from 'react-dom/client';
        const rootElement = document.getElementById('root');
        const root = createRoot(rootElement);
        root.render(<App />);
        `,
      "src/App.js": outdent`
        import React from "react";
        import Component from "./components";
    
        export default function App() {
          return <Component />
        }
      `,
      ...files,
    },
    dependencies: {
      "@adaptui/react": "latest",
      react: "18.0.0",
      "react-dom": "18.0.0",
      "react-scripts": "latest",
      "@internationalized/date": "^3.0.0-rc.0",
    },
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
      test: "react-scripts test --env=jsdom",
      eject: "react-scripts eject",
    },
    main: "src/index.js",
    userDependencies,
  };
};
export const REACT_CUSTOM_CODESANDBOX: CodeSandboxTemplate = (
  userDependencies = [],
  files = {},
) => {
  return {
    template: "create-react-app-typescript",
    files: {
      "public/index.html": `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
            <!--
                manifest.json provides metadata used when your web app is added to the
                homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
            -->
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
            <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
            <title>React App</title>
        </head>
        <body>
            <noscript>
                You need to enable JavaScript to run this app.
            </noscript>
            <div id="root"></div>
        </body>
        </html>
      `,
      "src/index.tsx": `
        import * as ReactDOM from "react-dom";
        import * as React from "react";
        import App from "./App";
        const rootElement = document.getElementById("root");
        ReactDOM.render(<App />, rootElement);
      `,
      "src/App.tsx": `import React from \"react\";\n import Component from \"./components\";\n\nexport default function App() {\n  return (\n    <div>\n  <main >\n        <Component />\n      </main>\n    </div>\n  );\n}\n`,
      ...files,
    },
    dependencies: {
      "@adaptui/react": "latest",
      react: "17.0.2",
      "react-dom": "17.0.2",
      next: "12.0.7",
    },
    devDependencies: {
      "@types/node": "17.0.5",
      "@types/react": "17.0.38",
      "@types/react-dom": "17.0.11",
      typescript: "4.5.4",
    },
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    main: "src/index.ts",
    userDependencies,
  };
};

export const CreateAppTemplate = (props: object | undefined) => {
  return outdent`
    import React from "react";
    import Component from "./components";

    export default function App() {
      return <Component ${props && `{...${JSON.stringify(props)}}`} />
    }
`;
};
