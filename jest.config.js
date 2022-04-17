module.exports = {
  roots: ['<rootDir>/src'],
  modulePaths: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}