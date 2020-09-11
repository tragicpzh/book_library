module.exports = {
  plugins: ['react', 'html'],
  settings: {
    'html/html-extensions': ['.html', '.ejs'], // consider .html and .ejs files as HTML
  },
  root: true,
  extends: ['eslint-config-firesoon/typescript-react'],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  rules: {
    // https://reactjs.org/docs/hooks-rules.html
    "react-hooks/exhaustive-deps": "error", // 依赖少写或导致数据错误，使用error
    "react-hooks/rules-of-hooks": "error",
  },
};
