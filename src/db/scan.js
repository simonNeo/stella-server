const { getRealPath } = require("../helper");
const { checkDatabaseConfig } = require("./helper");
const stellaConfig = require('../config');

async function scan() {
  console.log('开始扫描');
  const config = checkDatabaseConfig();
  const SequelizeAuto = require('sequelize-auto');
  const realPath = getRealPath(stellaConfig.server.db.modelPath);
  const auto = new SequelizeAuto(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    directory: realPath,
    caseModel: 'p',
    caseProp: 'c',
    caseFile: 'p',
    skipTables: ['SequelizeMeta'],
  });
  const res = await auto.run();
  console.log(`扫描结束，请查看 ${realPath}`)
}

scan();