const ts = require("typescript");
const prettier = require("prettier/standalone");
const parserBabel = require("prettier/parser-babel");

const prettierConfig = require("../../.prettierrc.js");

module.exports = function transformTs(file) {
  const emptyLinesPreserved = file.replace(/\n$/gm, "\n/** NEWLINE **/");

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
};
