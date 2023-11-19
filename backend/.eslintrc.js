module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
		ecmaVersion: "latest",
	},
	plugins: ["@typescript-eslint/eslint-plugin"],
	extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: [
		"node_modules/",
		"dist/",
		".eslintrc.js",
		"*-preset.js",
		"*.config.js",
		".github",
	],
	rules: {
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				varsIgnorePattern: "^_|twoFactorAuthenticationSecret|password",
				argsIgnorePattern: "^_|twoFactorAuthenticationSecret|password",
			},
		],
		"linebreak-style": ["error", "unix"],
		semi: ["error", "always"],
	},
};
