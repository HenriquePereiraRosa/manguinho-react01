module.exports = {
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  testTimeout: 100000, // todo: decrease in production
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/**/*', // excluding router
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts' // exclude module files
  ],
  coverageDirectory: 'coverage',
  // setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/cypress'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  }
}
