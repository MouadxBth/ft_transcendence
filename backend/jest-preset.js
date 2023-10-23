module.exports = {
	preset: "ts-jest",
	displayName: "jest-swc-preset",

	passWithNoTests: true,

	rootDir: ".",

	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/src/$1",
	},

	transform: {
		"^.+\\.ts$": ["@swc/jest"],
	},
	collectCoverageFrom: ["**/*.ts"],

	testEnvironment: "node",

	moduleFileExtensions: ["js", "json", "ts"],

	modulePathIgnorePatterns: [
		"<rootDir>/__fixtures__",
		"<rootDir>/node_modules",
		"<rootDir>/dist",
		"<rootDir>/coverage",
		"<rootDir>/ignore",
		"<rootDir>/test",
	],
};
