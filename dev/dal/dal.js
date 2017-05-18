'use strict';

module.exports = (connection) => {
  let DAL = {};

  // recipes
  DAL.recipes = require('./recipes.js')(connection);

  // Settings
  DAL.settings = require('./settings.js')(connection);

  return DAL;
};
