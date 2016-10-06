'use strict';

const Boom = require('boom');

module.exports = function handler(request, reply) {
  return reply(Boom.forbidden());
};
