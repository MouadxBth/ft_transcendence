module.exports = {
	preset: './jest/ts-jest/jest-preset.js',
	displayName: {
		color: 'magenta',
		name: 'swc-e2e',
	},

	rootDir: "../../..",

	testRegex: '.e2e-spec.ts$',

	coverageDirectory: '<rootDir>/coverage/ts-jest/e2e',

	modulePathIgnorePatterns: [
		'.*\\.spec\\.ts$',
	]

};
