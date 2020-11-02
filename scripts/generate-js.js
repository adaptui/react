const fs = require("fs");
const path = require("path");
const transpileTs = require("./transpile-ts");
const globFs = require("glob-fs")();

const folders = ["accordion"];
function recurse(file) {
  // `file.pattern` is an object with a `glob` (string) property
  file.recurse = file.pattern.glob.indexOf("**") !== -1;
  return file;
}

const generateJsFiles = filePath => {
  const accordionComponent = fs.readFileSync(
    path.join(process.cwd(), filePath),
    { encoding: "utf8" },
  );
  const appTemplateJs = transpileTs(accordionComponent);

  fs.writeFileSync(
    path.join(
      process.cwd(),
      filePath.replace("stories", "stories\\__js").replace(".tsx", ".jsx"),
    ),
    appTemplateJs,
  );
};

const files = globFs.use(recurse).readdirSync("**/*.component.tsx", {});
files.forEach(filePath => generateJsFiles(filePath));

console.log(files);
