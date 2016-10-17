'use strict';

module.exports = {
  method: 'GET',
  path: '/signup',
  config: {
    description: 'Returns a sinup form',
    auth: { strategy: 'dashboards-session', mode: 'try' },
    plugins: { 'hapi-auth-cookie': { redirectTo: false } },
    handler: require('../controllers/signup.js'),
  },
};
