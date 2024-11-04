module.exports = {
    root: true,
    env: {
        browser: true,
        es2020:true,
    },
    extends: [
        'eslint:recomended',
        'plugin:react/recomended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recomended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "qoutes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing":[
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "react/react-in-jsx-scope": "off",
        "react/prop-types": 0,
        "no-unused-vars": 0
    },
}