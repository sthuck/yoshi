const os = require('os');
const path = require('path');
const fs = require('fs-extra');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async () => {
  await fs.remove(DIR);
  await global.BROWSER.close();
};
