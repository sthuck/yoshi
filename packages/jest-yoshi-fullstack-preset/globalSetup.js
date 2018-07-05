const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async () => {
  const browser = (global.BROWSER = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  }));

  await fs.outputFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
