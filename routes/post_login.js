'use strict';

module.exports = {
  method: 'POST',
  path: '/login',
  config: {
    description: 'Returns a login form',
    auth: { strategy: 'dashboards-session', mode: 'try' },
    plugins: { 'hapi-auth-cookie': { redirectTo: false } },
    validate: {
      payload: require('../models/user.js'),
      failAction: require('../controllers/login.js'),
    },
    handler: require('../controllers/login.js'),
  },
};
