module.exports = {
	preset: './jest/ts-jest/jest-preset.js',
	displayName: {
		color: 'blue',
		name: 'swc-unit-integration',
	},

	rootDir: "../../..",

	testRegex: '.*\\.spec\\.ts$',

	coverageDirectory: '<rootDir>/coverage/ts-jest/testing',

	modulePathIgnorePatterns: [
		"<rootDir>/test",
	],
};
