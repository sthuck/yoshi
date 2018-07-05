module.exports = {
  globalSetup: require.resolve('./globalSetup'),
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
      testEnvironment: require.resolve('./jest-environment-bootstrap'),
      testMatch: ['<rootDir>/test/it/**/*.spec.js'],
    },
    {
      displayName: 'e2e',
      testEnvironment: require.resolve('./jest-environment-puppeteer'),
      testMatch: ['<rootDir>/test/e2e/**/*.e2e.js'],
    },
  ],
};
