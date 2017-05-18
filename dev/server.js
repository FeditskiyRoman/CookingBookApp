'use strict';

// External
const Hapi = require('hapi');
const _ = require('lodash');
const Promise = require('promise');
const connectDB = require('./dataConnection.js');

// Internal
const config = require('./config.js');
const migrations = require('./migrations/migrations');

function logError(error) {
  console.log(' ======================= uncaughtException:');
  console.log(error.stack);
}

module.exports = function () {
  startServer();
};

function startServer() {
  const server = new Hapi.Server();
  server.connection({
    port: config.server.port,
    routes: {
      cors: {
        origin: ['*'],
        credentials : true
      }
    }
  });

  connectDB().then(
    _.bind(registerDAL, null)
  ).then(
    function(DAL) {
      migrationsStart(DAL).then(
        _.bind(registerStaticFilesServer, null, server)
      ).then(
        _.bind(registerRouting, null, server, DAL)
      ).then(
        _.bind(run, null, server)
      ).then(
        _.bind(showSuccessMessage, null, server),
        function(err) {
          logError(err);
        }
      )
    }
  );
}

function migrationsStart(DAL) {
  return new Promise(
    function (resolve) {
      console.log('-| Migrations start');
      migrations(DAL, function () {
        console.log('-| Migrations end');
        resolve();
      });
    }
  );
}

function registerStaticFilesServer(server) {
  return new Promise(
    function (resolve, reject) {
      const plugin = require('inert');
      server.register(plugin, function (err) {
        err ? reject() : resolve();
      });
    }
  );
}

function registerRouting(server, DAL) {
  const routing = require('./routing');
  routing.init(server, DAL);
}

function registerDAL(connection) {
  return require('./dal/dal.js')(connection);
}

function showSuccessMessage(server) {
  server.log('info', 'Server running at: ' + server.info.uri);
  console.log('Server running at: ' + server.info.uri);
}

function run(server) {
  return new Promise(
    function (resolve, reject) {
      server.start((err) => {
        err ? reject() : resolve();
      });
    }
  );
}