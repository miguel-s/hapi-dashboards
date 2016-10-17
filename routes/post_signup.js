'use strict';

module.exports = {
  method: 'POST',
  path: '/signup',
  config: {
    description: 'Returns a sinup form',
    auth: { strategy: 'dashboards-session', mode: 'try' },
    plugins: { 'hapi-auth-cookie': { redirectTo: false } },
    validate: {
      payload: require('../models/user.js'),
      failAction: require('../controllers/signup.js'),
    },
    handler: require('../controllers/signup.js'),
  },
};
