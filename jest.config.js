module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(bulma)/)",
    "node_modules/(?!(.*@testing-library.*|.*react.*|.*jsx-runtime.*))",
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/mocks/styleMock.js",
  },
};
