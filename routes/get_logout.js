'use strict';

module.exports = {
  method: 'GET',
  path: '/logout',
  config: {
    description: 'Logout user',
    handler: require('../controllers/logout.js'),
  },
};
