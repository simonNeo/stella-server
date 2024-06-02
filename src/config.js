const { resolveFileSafe, merge } = require("./helper")


const defaultConfig = require('./defaultConfig')

const config = resolveFileSafe('/stella.config.js') || {};

const cfg = merge(defaultConfig, config);

module.exports = cfg;
