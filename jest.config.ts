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
  maxWorkers: 1,
};

export default config;
