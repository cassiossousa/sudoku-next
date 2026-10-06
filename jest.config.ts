const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  collectCoverageFrom: ['**/*.(ts|tsx)', '!**/*.d.ts', '!**/node_modules/**'],
  // maxWorkers is controlled via CLI flags in scripts (runInBand for local, maxWorkers=2 for CI)
};

export default config;
