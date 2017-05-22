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
    method: 'GET',
    path: '/api/recipe/{id}',
    handler: function (request, reply) {
      DAL.recipes.getById(request.params.id).then(
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

  server.route({
    method: 'DELETE',
    path: '/api/recipe/{id}',
    handler: function (request, reply) {
      DAL.recipes.delete(request.params.id).then(
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
    method: 'PUT',
    path: '/api/recipe',
    handler: function (request, reply) {
      DAL.recipes.update(request.payload).then(
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