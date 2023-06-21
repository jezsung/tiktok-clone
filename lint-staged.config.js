module.exports = {
  '**/*.{json,js,jsx,ts,tsx,md}': (filenames) =>
    filenames.map((filename) => `prettier --write ${filename}`),
};
