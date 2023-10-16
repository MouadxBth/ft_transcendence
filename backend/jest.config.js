module.exports = {
	preset: 'ts-jest',
	displayName: 'swc-unit-integration',

	rootDir: '.',
	testRegex: '.*\\.spec\\.ts$',

	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	collectCoverageFrom: ['**/*.ts'],
	coverageDirectory: '<rootDir>/coverage/testing',

	testEnvironment: 'node',

	testEnvironment: 'node',

	moduleFileExtensions: ['js', 'json', 'ts'],

	modulePathIgnorePatterns: [
		'<rootDir>/__fixtures__',
		'<rootDir>/node_modules',
		'<rootDir>/dist',
		'<rootDir>/coverage',
		'<rootDir>/ignore',
		'<rootDir>/test'
	],
};
