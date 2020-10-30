const { join } = require("path");
const pkg = require("./package.json");

module.exports = {
  rootDir: __dirname,
  displayName: pkg.name,
  testMatch: [join(__dirname, "src/**/*.test.{js,ts,tsx}")],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  coveragePathIgnorePatterns: [
    "node_modules",
    "__mocks__",
    "stories",
    "<rootDir>/src/meter/__examples__/index.ts",
    "<rootDir>/src/meter/__examples__/__tests__/statehook-test-data.ts",
  ],
};
