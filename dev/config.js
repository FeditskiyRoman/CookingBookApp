var merge = require('merge');

var userConfig;

try {
  userConfig = require('./userConfig.js');
} catch (ex) {
  userConfig = {};
}

const DB = {
  TYPES: {
    MONGO: 'MONGO',
    MySQL: 'MySQL'
  }
}

var config = {
  db: {
    type: DB.TYPES.MySQL,
    dbName: 'testdb',
    host: 'localhost',
    user: 'root',
    password: ''
  },
  server: {
    port: 8081
  }
};

module.exports = merge(config, userConfig);