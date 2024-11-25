module.exports = {
    root: true,
    env: {
        browser: true,
        e2020: true,
        "jest/globals": true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
      ],
      ignorePatterns: ['dist', '.eslintrc.cjs'],
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      settings: { react: { version: '18.2' } },
      plugins: ['react-refresh'],
      rules: {
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        'react/default-props-match-prop-types': [
          'true', 
          { "allowRequiredDefaults": true }
        ]
    },
}