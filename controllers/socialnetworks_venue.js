'use strict';

module.exports = function handler(request, reply) {
  return reply.view('socialnetworks_venue', { id: request.params.id });
};
