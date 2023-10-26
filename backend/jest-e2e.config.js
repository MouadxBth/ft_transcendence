module.exports = {
	preset: './jest-preset.js',
	displayName: {
		color: 'magenta',
		name: 'swc-e2e',
	},

	testRegex: '.e2e-spec.ts$',

	coverageDirectory: '<rootDir>/coverage/e2e',

	modulePathIgnorePatterns: [
		'.*\\.spec\\.ts$',
	]

};
