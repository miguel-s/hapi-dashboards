'use strict';

module.exports = {
  method: 'GET',
  path: '/',
  config: {
    description: 'Returns the index page',
    auth: { strategy: 'dashboards-session', mode: 'try' },
    plugins: { 'hapi-auth-cookie': { redirectTo: '/login' } },
    handler: require('../controllers/index.js'),
  },
};
