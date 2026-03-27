module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'jest --bail --findRelatedTests --passWithNoTests'
  ],
  '*.{json,css,md}': [
    'prettier --write'
  ],
  '*.{ts,tsx}': [
    'tsc --noEmit --skipLibCheck'
  ],
  'package.json': [
    'prettier --write',
    'npm audit --audit-level moderate'
  ]
}
