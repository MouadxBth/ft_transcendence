module.exports = {
	preset: "ts-jest",
	displayName: "jest-ts-jest-preset",

	passWithNoTests: true,

	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/src/$1",
	},

	transform: {
		"^.+\\.ts$": ["ts-jest"],
	},
	collectCoverageFrom: ["**/*.ts"],

	coveragePathIgnorePatterns: ["main.ts"],

	testEnvironment: "node",

	moduleFileExtensions: ["js", "json", "ts"],

	modulePathIgnorePatterns: [
		".*\\.ignore\\.ts$",
		"<rootDir>/__fixtures__",
		"<rootDir>/node_modules",
		"<rootDir>/dist",
		"<rootDir>/coverage",
		"<rootDir>/ignore",
	],
};
