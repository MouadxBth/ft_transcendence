module.exports = {
	preset: 'ts-jest',
	displayName: 'swc-unit-integration',

	rootDir: '.',
	testRegex: '.e2e-spec.ts$',

	transform: {
		'^.+\\.ts$': ['@swc/jest'],
	},
	collectCoverageFrom: ['**/*.ts'],
	coverageDirectory: '<rootDir>/coverage/e2e',
	testEnvironment: 'node',

	testEnvironment: 'node',

	moduleFileExtensions: ['js', 'json', 'ts'],

	modulePathIgnorePatterns: [
		'<rootDir>/__fixtures__',
		'<rootDir>/node_modules',
		'<rootDir>/dist',
		'<rootDir>/coverage',
		'<rootDir>/ignore'
	],

};
