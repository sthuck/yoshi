## 🤹 Jest yoshi preset

> Jest setup for Yoshi based projects

### Introduction

This preset configures Jest with 3 environments ([learn more](https://jestjs.io/docs/en/configuration#testenvironment-string)). Each environment setups up its own globals and is configured to run for every file with matching a certain glob pattern ([learn more](https://github.com/isaacs/node-glob)).

#### JSDOM environment

Sets up a standard [JSDOM](https://github.com/jsdom/jsdom) environment for component tests. It's configured for every file under `<rootDir>/src/**/*.spec.js`.

#### Server environment

An environment for testing your server (API) code. It starts up a different instance of your server ([wix-ng-bootstarp based](https://github.com/wix-platform/wix-node-platform)) for every test file. Runs for every test file matching `<rootDir>/test/it/**/*.spec.js`.

#### Puppeteer environment

An environment that pre-configures [Puppeteer](https://github.com/GoogleChrome/puppeteer) for running E2E tests. Runs for file that match `<rootDir>/test/e2e/**/*.e2e.js`.

### Usage

Install by running:

```bash
npm install --save-dev jest-yoshi-preset puppeteer jest
```

Add the following to your Jest config:

```json
{
    "preset": "jest-yoshi-preset"
}
```
