const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const BootstrapEnvironment = require('jest-environment-yoshi-bootstrap');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = class PuppeteerEnvironment extends BootstrapEnvironment {
  async setup() {
    await super.setup();

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
