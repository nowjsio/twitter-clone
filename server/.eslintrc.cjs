module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'], // 이렇게 해줘야 eslint 와 prettier 충돌 안난다. —> 1.eslint-plugin-prettier 활성화 시킵니다.2. prettier/prettier rule을 error로 설정합니다.3. eslint-config-prettier를 적용시킵니다. 한방에 됨
  parser: 'babel-eslint', // 이거 안하면, eslint 가 es5 기준이여서 es 6 이상 문법 에러라고 판단할 수 있음. 따라서, 해줘야됨. npm install babel-eslint --save-dev
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  globals: {
    $: true,
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'import/extensions': 'off',
    'no-extra-boolean-cast': 'off',
  },
};
