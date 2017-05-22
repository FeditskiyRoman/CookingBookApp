'use strict'

module.exports = (connection) => {
  return {
    add: (data) => {
        return new Promise((resolve, reject) => {
          let request = [
            'INSERT INTO ',
            '`recipes` (`id`, `name`, `description`, `category`, `date`) ',
            'VALUES (NULL, "' + data.name + '", "' + data.description +
              '", "' + data.category + '", NOW());'
          ].join('');

        connection.query(request, (err, response) => {
          err ? reject(err) : resolve(response);
        });
      });
    },

    getAll: () => {
      return new Promise((resolve, reject) => {
        let request = [
          'SELECT * ',
          'FROM recipes ;'
        ].join('');

        connection.query(request, (err, response) => {
          err ? reject(err) : resolve(response);
        });
      });
    },

    getById: (id) => {
      return new Promise((resolve, reject) => {
        let request = [
          'SELECT * FROM `recipes` WHERE id = "' + id + '";'
        ].join('');

        connection.query(request, (err, response) => {
          err ? reject(err) : resolve(response[0]);
        });
      });
    },

    delete: (id) => {
      return new Promise((resolve, reject) => {
        let request = [
          'DELETE ',
          'FROM recipes ',
          'WHERE id=' + id + ';'
        ].join('');

        connection.query(request, (err, response) => {
          err ? reject(err) : resolve(response[0]);
        });
      });
    },

    update: (data) => {
      return new Promise((resolve, reject) => {
        let request = [
          'UPDATE recipes ',
          'SET name="' + data.name + '", ',
          'description="' + data.description + '", ',
          'category="' + data.category + '", ',
          'date=NOW() ',
          'WHERE id="' + data.id + '";'
        ].join('');

        connection.query(request, (err, response) => {
          err ? reject(err) : resolve(response);
        });
      });
    },

      // For migrations
    createTable: (cb) => {
      let request = [
        'CREATE TABLE ',
        'IF NOT EXISTS ',
        'recipes ',
        '(',
          'id int(255) NOT NULL AUTO_INCREMENT UNIQUE, ',
          'name varchar(255), ',
          'description varchar(8000), ',
          'category varchar(255), ',
          'date datetime ',
        '); '
      ].join('');

      return connection.query(request, cb);
    }
  }
};