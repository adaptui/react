/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const { join } = require("path");
const pkg = require("./package.json");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  rootDir: __dirname,
  testEnvironment: "jsdom",
  displayName: pkg.name,
  testMatch: [join(__dirname, "src/**/*.test.{js,ts,tsx}")],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    "^@shared(.*)$": "<rootDir>/shared$1",
  },
  coveragePathIgnorePatterns: [
    "node_modules",
    "__mocks__",
    "stories",
    "<rootDir>/src/meter/__examples__/index.ts",
    "<rootDir>/src/meter/__examples__/__tests__/statehook-test-data.ts",
  ],
  clearMocks: true,
};
