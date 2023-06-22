module.exports = {
  '**/*.{json,js,jsx,ts,tsx,md}': `prettier --write`,
  '**/*.{js,jsx,ts,tsx}': 'eslint --fix --max-warnings=0',
};
