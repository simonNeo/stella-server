const { Sequelize } = require('sequelize');
const { checkDatabaseConfig } = require('./helper');
const { resolveFileSafe } = require('../helper');
const stellaConfig = require('../config')
const path = require('path')

const sequelize = new Sequelize(checkDatabaseConfig());

let models = null;
try {
  const initModels = resolveFileSafe(path.resolve(stellaConfig?.server?.db?.modelPath, 'init-models.js'))
  if (!initModels) {
    throw new Error('初始化模型失败，请先运行 stella db:scan')
  }
  models = initModels(sequelize);
} catch (error) {
  throw error;
}

module.exports = {
  sequelize,
  models,
}
