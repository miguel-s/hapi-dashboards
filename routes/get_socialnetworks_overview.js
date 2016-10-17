'use strict';

const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/socialnetworks/overview',
  config: {
    description: 'Returns the social networks dashboard',
    auth: { strategy: 'dashboards-session', mode: 'try' },
    plugins: { 'hapi-auth-cookie': { redirectTo: '/login' } },
    handler: require('../controllers/socialnetworks.js'),
    validate: {
      query: {
        city: Joi.string().min(3).max(30).optional(),
        district: Joi.string().min(3).max(30).optional(),
      },
    },
  },
};
