'use strict';

const Boom = require('boom');

module.exports = function (server, DAL) {

  server.route({
    method: 'GET',
    path: '/api/recipes',
    handler: function (request, reply) {
      DAL.recipes.getAll().then(
        (res) => {
          reply(res);
        },
        (err) => {
          reply(Boom.badImplementation(err, err));
        }
      );
    }
  });

  server.route({
    method: 'POST',
    path: '/api/recipe',
    handler: function (request, reply) {
      console.log(request.payload);
      DAL.recipes.add(request.payload).then(
        (res) => {
          reply(res);
        },
        (err) => {
          reply(Boom.badImplementation(err, err));
        }
      );
    }
  });

};