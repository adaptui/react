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

function createFile(filePath, fileContent = "") {
  fs.writeFile(filePath, fileContent, error => {
    if (error) {
      console.log(`Failed to create ${filePath}`, chalk.red.bold("ERROR"));
      throw error;
    }
  });
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

module.exports = {
  walkSync,
  createFile,
  createDirectory,
  getDirectories,
};
