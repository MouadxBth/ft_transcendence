module.exports = {
	preset: './jest/swc/jest-preset.js',
	displayName: {
		color: 'blue',
		name: 'swc-unit-integration',
	},

	rootDir: "../../..",

	testRegex: '.*\\.spec\\.ts$',

	coverageDirectory: '<rootDir>/coverage/swc/testing',

	modulePathIgnorePatterns: [
		"<rootDir>/test",
	],
};
