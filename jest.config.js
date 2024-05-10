module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation)",
  ],
  collectCoverageFrom: [
    "<rootDir>/src/Components/**/*.jsx",
    "<rootDir>/src/App.jsx",
    "<rootDir>/src/Components/**/*.tsx",
    "<rootDir>/src/App.tsx",
  ],
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  testMatch: ["**/*.test.ts?(x)", "**/*.test.js?(x)"],
};
