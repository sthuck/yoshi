const wnpm = require('wnpm-ci');
const { createRunner } = require('haste-core');
const LoggerPlugin = require('../plugins/haste-plugin-yoshi-logger');

const runner = createRunner({
  logger: new LoggerPlugin(),
});

module.exports = runner.command(async () => wnpm.prepareForRelease());
