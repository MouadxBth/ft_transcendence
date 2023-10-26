module.exports = {
	preset: './jest/swc/jest-preset.js',
	displayName: {
		color: 'magenta',
		name: 'swc-e2e',
	},

	rootDir: "../../..",

	testRegex: '.e2e-spec.ts$',

	coverageDirectory: '<rootDir>/coverage/swc/e2e',

	modulePathIgnorePatterns: [
		'.*\\.spec\\.ts$',
	]

};
