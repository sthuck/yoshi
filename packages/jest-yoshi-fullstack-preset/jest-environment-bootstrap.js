const path = require('path');
const testkit = require('wix-bootstrap-testkit');
const configEmitter = require('wix-config-emitter');
const rpcTestkit = require('wix-rpc-testkit');
const NodeEnvironment = require('jest-environment-node');

const JEST_WORKER_ID = parseInt(process.env.JEST_WORKER_ID, 10);

const PORT = 3100 + JEST_WORKER_ID;
const MANAGEMENT_PORT = 3200 + JEST_WORKER_ID;
const RPC_PORT = 3300 + JEST_WORKER_ID;
const APP_CONF_DIR = `./target/configs-${JEST_WORKER_ID}`;

const config = require(path.join(process.cwd(), 'jest-yoshi.config.js'));

module.exports = class BootstrapEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    const emitter = configEmitter({
      sourceFolders: ['./templates'],
      targetFolder: APP_CONF_DIR,
    });

    this.global.rpcServer = rpcTestkit.server({
      port: RPC_PORT,
    });

    this.global.app = testkit.app('./index', {
      env: {
        PORT,
        APP_CONF_DIR,
        MANAGEMENT_PORT,
        NEW_RELIC_LOG_LEVEL: 'warn',
        DEBUG: '',
      },
    });

    await config.bootstrap.emit(emitter, { rpcServer: this.global.rpcServer });

    await this.global.rpcServer.start();
    await this.global.app.start();
  }

  async teardown() {
    await super.teardown();

    await this.global.app.stop();
    await this.global.rpcServer.stop();
  }
};
