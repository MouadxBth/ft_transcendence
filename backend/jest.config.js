module.exports = {
	preset: './jest-preset.js',
	displayName: {
		color: 'blue',
		name: 'swc-unit-integration',
	},

	testRegex: '.*\\.spec\\.ts$',

	coverageDirectory: '<rootDir>/coverage/testing',
};
