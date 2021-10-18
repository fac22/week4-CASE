# stop script when an error occurs
set -e

# npm init -y

npm i -d eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node eslint-plugin-html eslint-plugin-css-modules

npx install-peerdeps --dev eslint-config-airbnb-base

echo '{
  "arrowParens": "always",
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
    "endOfLine":"auto"
}' > .prettierrc.json

echo '{
  "extends": ["airbnb-base/legacy", "prettier", "plugin:node/recommended"],
  "plugins": ["prettier",  "html", "css-modules"],
  "rules": {
    "no-restricted-globals": ["error", "event", "fdescribe"],
    "prettier/prettier": ["off", { "singleQuote": true }],
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off"
  }
}' > .eslintrc.json

echo "============================================================================"
echo "✅ Initialised an NPM Project"
echo "✅ Installed dev dependencies for Airbnb style guide - ESLINT / PRETTIER "
echo "✅ Created Prettier Config"
echo "✅ Created Eslint Config"
echo "============================================================================"