import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import multiEntry from "@rollup/plugin-multi-entry";
const extensions = [".ts", ".tsx", ".js", ".jsx", ".json"];

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/*",
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "es",
      },
    ],
    plugins: [
      multiEntry(),
      commonjs(),
      resolve({
        preferBuiltins: false,
        extensions,
      }),
      babel({
        babelHelpers: "bundled",
        exclude: ["node_modules/**", "../../node_modules/**"],
        extensions,
      }),
    ],
  },
];
