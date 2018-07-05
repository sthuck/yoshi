const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');

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

  await fs.outputFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
