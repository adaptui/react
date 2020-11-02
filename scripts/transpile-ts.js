import * as ts from "typescript";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import prettierConfig from "../.prettierrc.json";

export function transformTs(file) {
  const emptyLinesPreserved = file.replace(/\n\n/g, "\n/** NEWLINE **/");
  const { outputText } = ts.transpileModule(emptyLinesPreserved, {
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
    },
  });
  const emptyLinesRestored = outputText.replace(/\/\*\* NEWLINE \*\*\//g, "\n");

  return prettier.format(emptyLinesRestored, {
    parser: "babel",
    plugins: [parserBabel],
    ...prettierConfig,
  });
}
