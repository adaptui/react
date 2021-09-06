const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// Create a new folder at the specified path
function createDirectory(path) {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  } catch (err) {
    console.error(`[createDirectory]: Failed to create director at ${path}`);
  }
}

const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);

  files.forEach(function (file) {
    const fullPath = path.join(dir, file);

    if (isDirectory(fullPath)) {
      filelist = walkSync(fullPath, filelist);
    } else {
      filelist.push(fullPath);
    }
  });

  return filelist;
}

function createFile(filePath, fileContent = "") {
  try {
    return fs.writeFileSync(filePath, fileContent);
  } catch (error) {
    console.log(`Failed to create ${filePath}`, chalk.red.bold("ERROR"));
    throw error;
  }
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, { encoding: "utf-8" });
  } catch (error) {
    console.log(`Failed to read ${filePath}`, chalk.red.bold("ERROR"));
    throw error;
  }
}

function isFileExists(filePath, fileContent = "") {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    console.log(`Failed to check ${filePath}`, chalk.red.bold("ERROR"));
    throw error;
  }
}

function joinCwd(filePath) {
  try {
    return path.join(process.cwd(), filePath);
  } catch (error) {
    console.log(`Failed to join ${filePath}`, chalk.red.bold("ERROR"));
    throw error;
  }
}

const extractCode = filePath => {
  const code = readFile(filePath);
  const componentName = path.basename(filePath).replace(/\.[^/.]+$/, "");
  const replaceHead = `export const ${componentName} = `;
  const replaceTail = `export default ${componentName};`;
  const trimmedCode = code.replace(replaceHead, "").replace(replaceTail, "");

  return JSON.parse(trimmedCode);
};

module.exports = {
  walkSync,
  isDirectory,
  createFile,
  createDirectory,
  getDirectories,
  readFile,
  isFileExists,
  joinCwd,
  extractCode,
};
