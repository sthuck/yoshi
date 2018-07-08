module.exports = {
  globalSetup: require.resolve('jest-environment-yoshi-puppeteer/globalSetup'),
  globalTeardown: require.resolve(
    'jest-environment-yoshi-puppeteer/globalSetup',
  ),
  transform: {
    '^.+\\.(js)$': require.resolve('babel-jest'),
  },
  projects: [
    {
      displayName: 'component',
      testEnvironment: 'jsdom',
      testURL: 'http://localhost',
      testMatch: ['<rootDir>/src/**/*.spec.js'],
      moduleNameMapper: {
        '^.+\\.(css|scss)$': require.resolve('identity-obj-proxy'),
      },
    },
    {
      displayName: 'server',
      testEnvironment: require.resolve('jest-environment-yoshi-bootstrap'),
      testMatch: ['<rootDir>/test/it/**/*.spec.js'],
    },
    {
      displayName: 'e2e',
      testEnvironment: require.resolve('jest-environment-yoshi-puppeteer'),
      testMatch: ['<rootDir>/test/e2e/**/*.e2e.js'],
    },
  ],
};
