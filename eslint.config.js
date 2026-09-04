const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
// Note: @next/eslint-plugin-next to be installed in next step
// const nextPlugin = require("@next/eslint-plugin-next");

module.exports = [
  {
    ignores: ["node_modules/", "dist/", ".next/", "build/", "coverage/"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: "readonly",
        node: "readonly",
        es2021: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      // "@next/next": nextPlugin,  // To be enabled after package installation
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // "@next/next/no-html-link-for-pages": "error",  // To be enabled after plugin installation
      // "@next/next/no-img-element": "warn",  // To be enabled after plugin installation
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
