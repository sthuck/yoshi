const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const BootstrapEnvironment = require('./jest-environment-bootstrap');
const cdn = require('yoshi/src/tasks/cdn');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = class PuppeteerEnvironment extends BootstrapEnvironment {
  async setup() {
    await super.setup();

    try {
      await cdn({
        port: 3200,
        host: '0.0.0.0',
        ssl: false,
        publicPath: 'http://localhost:3200/',
        statics: 'dist/statics',
        webpackConfigPath: require.resolve(
          'yoshi/config/webpack.config.client',
        ),
        configuredEntry: false,
        defaultEntry: './client',
        hmr: false, // 'auto',
        liveReload: false, // true,
        transformHMRRuntime: true,
      });
    } catch (error) {}

    const browserWSEndpoint = fs.readFileSync(
      path.join(DIR, 'wsEndpoint'),
      'utf8',
    );

    if (!browserWSEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    this.global.browser = await puppeteer.connect({
      browserWSEndpoint,
    });
  }
};
