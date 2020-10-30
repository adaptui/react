import ts from "typescript";
// @ts-ignore
import appTemplateRaw from "!!raw-loader!./Accordion.component.tsx";

// import tsconfig from "../../../tsconfig.json";
// const pathToTsConfig = "../../../tsconfig.json";
// const compilerOptions = ts.parseJsonConfigFileContent(
//   tsconfig,
//   ts.sys,
//   pathToTsConfig,
// );

const { outputText: appTemplate } = ts.transpileModule(appTemplateRaw, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ES2020,
    lib: ["dom", "esnext"],
    jsx: ts.JsxEmit.Preserve,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    skipLibCheck: true,
    downlevelIteration: true,
    resolveJsonModule: true,
    strict: false,
    strictFunctionTypes: true,
    strictNullChecks: true,
    strictPropertyInitialization: true,
    suppressImplicitAnyIndexErrors: true,
    noImplicitAny: true,
    noFallthroughCasesInSwitch: true,
    types: ["node", "jest", "@testing-library/jest-dom"],
    sourceMap: true,
    declaration: true,
    declarationDir: "dist/types",
  },
});

// @ts-ignore
export { default as styledAppTemplate } from "!!raw-loader!./AccordionStyled.component.tsx";

// @ts-ignore
export { default as cssTemplate } from "!!raw-loader!./AccordionStyled.css";

export { appTemplate };
