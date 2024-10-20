module.exports = {
    parser: 'vue-eslint-parser', // Use vue-eslint-parser for .vue files
    parserOptions: {
      parser: '@babel/eslint-parser', // Use Babel parser for JS parts
      requireConfigFile: false,
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    extends: [
      'plugin:vue/recommended', // Use recommended rules from vue
      'eslint:recommended',
    ],
    rules: {
      // Add any custom rules here
    },
  };