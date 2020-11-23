const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const prettier = require("prettier/standalone");
const markdownParser = require("prettier/parser-markdown");

const { walkSync, createFile } = require("./fs-utils");
const prettierConfig = require("../.prettierrc.json");

const docsFolder = path.resolve(process.cwd(), "docs");
const readmes = walkSync(docsFolder);

readmes.forEach(readme => {
  const mdContent = fs.readFileSync(readme, { encoding: "utf-8" });
  const basename = path.basename(readme);

  console.log(chalk.blue("prettify:"), chalk.blueBright(basename));
  createFile(
    path.join(docsFolder, basename),
    prettier.format(mdContent, {
      parser: "markdown",
      plugins: [markdownParser],
      ...prettierConfig,
    }),
  );
});
