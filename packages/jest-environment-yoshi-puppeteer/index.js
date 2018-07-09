const fs = require('fs');
const puppeteer = require('puppeteer');
const BootstrapEnvironment = require('jest-environment-yoshi-bootstrap');
const { WS_ENDPOINT_PATH } = require('./constants');

module.exports = class PuppeteerEnvironment extends BootstrapEnvironment {
  async setup() {
    await super.setup();

    const browserWSEndpoint = fs.readFileSync(WS_ENDPOINT_PATH, 'utf8');

    if (!browserWSEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    this.global.browser = await puppeteer.connect({
      browserWSEndpoint,
    });
  }
};
