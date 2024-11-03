import prettier from 'eslint-config-prettier'
import chai from 'eslint-plugin-chai-friendly'
import cypress from 'eslint-plugin-cypress'

export default [
  {
    plugins: { prettier, cypress, chai },
    files: ['cypress/e2e/*.cy.js', 'cypress/fixtures/*.js', 'pages/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        sourceType: 'module',
        project: ['tsconfig.json']
      }
    },
    rules: {
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'cypress/no-async-tests': 'error',
      'cypress/unsafe-to-chain-command': 'warn',
      'cypress/no-pause': 'error',
      'no-console': 'off',
      'no-useless-escape': 'off',
      'no-empty-pattern': 'off',
      'no-eval': 'error',
      'no-multi-spaces': 'error',
      'no-new': 'warn',
      'no-return-assign': 'warn',
      'comma-dangle': ['error', 'never'],
      strict: ['error', 'global'],
      'func-style': ['warn', 'expression'],
      'no-new-func': 'error',
      'no-param-reassign': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-invalid-this': 'error',
      'prefer-destructuring': [
        'warn',
        { array: true, object: true },
        { enforceForRenamedProperties: true }
      ],
      'no-implied-eval': 'error',
      eqeqeq: 'error',
      'no-with': 'error',
      'func-call-spacing': ['error', 'never'],
      'max-len': ['off', { code: 200, ignoreComments: true }],
      'new-cap': ['error', { newIsCap: true }],
      'new-parens': 'error',
      quotes: [
        'warn',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true }
      ],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-var': 'warn',
      'no-unused-vars': ['warn', { vars: 'local' }],
      'import/extensions': 'off',
      'no-prototype-builtins': 'off'
    }
  }
]
