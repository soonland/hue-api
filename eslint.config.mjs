import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("prettier"), 
    ...compat.extends("plugin:prettier/recommended"),
    ...compat.extends("plugin:react/recommended"), {
    plugins: {
        prettier,
        react,
        import: importPlugin,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.jest,
            ...globals.node,
        },

        ecmaVersion: 2019,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        "import/resolver": {
            node: {
                paths: ["src"],
            },
        },
    },

    rules: {
        "prettier/prettier": ["error", {
            printWidth: 150,
            singleQuote: true,
            trailingComma: "es5",
        }],

        "comma-dangle": "off",
        "linebreak-style": "off",

        "no-unused-vars": ["error", {
            argsIgnorePattern: "next",
        }],

        "no-use-before-define": ["error", {
            functions: false,
        }],

        "max-len": ["warn", {
            code: 150,
        }],

        "import/no-extraneous-dependencies": ["error", {
            devDependencies: true,
        }],

        "react/prefer-stateless-function": "error",
        "react/no-typos": "error",

        "react/prop-types": [2, {
            skipUndeclared: true,
        }],

        "react/jsx-filename-extension": [1, {
            extensions: [".js", ".jsx"],
        }],

        "no-underscore-dangle": ["error", {
            allow: ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"],
        }],

        "spaced-comment": ["warn", "always"],
    },
}];