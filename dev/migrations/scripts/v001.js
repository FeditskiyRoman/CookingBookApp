'use strict';

module.exports = function(DAL) {
  return {
    version: 1,
    message: 'Created recipes table',
    script: function (next) {
      DAL.recipes.createTable(next);
    }
  };
};
