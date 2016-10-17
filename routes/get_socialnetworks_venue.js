'use strict';

const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/socialnetworks/venue/{id}',
  config: {
    description: 'Returns the venues dashboard',
    auth: { strategy: 'dashboards-session', mode: 'try' },
    plugins: { 'hapi-auth-cookie': { redirectTo: '/login' } },
    handler: require('../controllers/socialnetworks_venue.js'),
    validate: {
      params: {
        id: Joi.string().alphanum().length(12).optional(),
      },
    },
  },
};
