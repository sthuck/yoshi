const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');
const cdn = require('yoshi/src/tasks/cdn');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

const config = require(path.join(process.cwd(), 'jest-yoshi.config.js'));

module.exports = async () => {
  const browser = (global.BROWSER = await puppeteer.launch({
    // defaults
    headless: true,
    args: ['--no-sandbox'],

    // user defined options
    ...config.puppeteer,
  }));

  await cdn({
    port: 3200,
    host: '0.0.0.0',
    ssl: false,
    publicPath: 'http://localhost:3200/',
    statics: 'dist/statics',
    webpackConfigPath: require.resolve('yoshi/config/webpack.config.client'),
    configuredEntry: false,
    defaultEntry: './client',
    hmr: false, // 'auto',
    liveReload: false, // true,
    transformHMRRuntime: true,
  });

  // override webpack plugin that messes with our babel config
  delete process.env.IN_WEBPACK;

  await fs.outputFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
