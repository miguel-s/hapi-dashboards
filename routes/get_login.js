'use strict';

module.exports = {
  method: 'GET',
  path: '/login',
  config: {
    description: 'Returns a login form',
    auth: { strategy: 'dashboards-session', mode: 'try' },
    plugins: { 'hapi-auth-cookie': { redirectTo: false } },
    handler: require('../controllers/login.js'),
  },
};
