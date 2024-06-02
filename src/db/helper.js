
function checkDatabaseConfig() {
  const config = require('../config');

  if (!config.server?.db) {
    throw new Error('未找到数据库配置，请检查config.server.db');
  }
  const { host, dialect, database, username, password, port, timezone, logging } = config?.server?.db;
  let missing = '';
  switch (undefined) {
    case host:
      missing = 'host';
      break;
    case database:
      missing = 'database';
      break;
    case username:
      missing = 'username';
      break;
    case password:
      missing = 'password';
      break;
  }
  if (missing) {
    throw new Error(`数据库配置错误，请检查config.server.db.${missing}`);
  }
  return {
    dialect: dialect || 'mysql',
    host,
    database,
    username,
    password,
    port: port || 3306,
    timezone: timezone || '+08:00',
    logging: logging || false
  }
}
module.exports = {
  checkDatabaseConfig
}