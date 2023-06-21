module.exports = {
  '**/*.{ts,tsx}': 'tsc-files --noEmit',
  '**/*.{json,js,jsx,ts,tsx,md}': (filenames) =>
    filenames.map((filename) => `prettier --write ${filename}`),
};
