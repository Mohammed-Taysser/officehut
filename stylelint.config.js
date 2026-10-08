/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    // BEM-ish + utility names like `.p-2`, `.card-status-top`, `.is-active`
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-{1,2}[a-z0-9]+)*$',
      { message: 'Use lowercase kebab-case class names' },
    ],
    'custom-property-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/at-mixin-pattern': null,
    'scss/percent-placeholder-pattern': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    // House style: lowercase `currentcolor`; font names keep their capitals.
    'value-keyword-case': [
      'lower',
      { camelCaseSvgKeywords: false, ignoreKeywords: ['/^[A-Z]/'] },
    ],
    'selector-not-notation': 'complex',
    'scss/comment-no-empty': null,
    // Formatting is Prettier's job.
    'scss/dollar-variable-colon-space-after': null,
  },
  overrides: [
    {
      // CSS modules in the docs: camelCase keys and :global() escapes are normal there.
      files: ['**/*.module.scss'],
      rules: {
        'selector-class-pattern': null,
        'selector-pseudo-class-no-unknown': [
          true,
          { ignorePseudoClasses: ['global', 'local'] },
        ],
      },
    },
  ],
};
