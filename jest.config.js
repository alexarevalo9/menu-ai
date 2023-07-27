const nextJest = require("next/jest");

process.env.SKIP_ENV_VALIDATION = "true";

const createJestConfig = nextJest({
  dir: "./src",
});

const customJestConfig = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  coveragePathIgnorePatterns: ["index.ts"],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/.jest/setEnvVars.ts"],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "<rootDir>/.jest/setEnvVars.ts",
  ],
};

module.exports = createJestConfig(customJestConfig);
