/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tabWidth: 2,
  printWidth: 120,
  trailingComma: "all",
  bracketSpacing: true,
};

export default config;
