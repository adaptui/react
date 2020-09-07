const { join } = require("path");
const pkg = require("./package.json");

module.exports = {
  rootDir: __dirname,
  displayName: pkg.name,
  testMatch: [join(__dirname, "src/**/*.test.{js,ts,tsx}")],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "ts-jest",
};
