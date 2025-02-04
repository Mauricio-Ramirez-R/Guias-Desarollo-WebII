module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        'react/prop-types': 'off',
    },
}
