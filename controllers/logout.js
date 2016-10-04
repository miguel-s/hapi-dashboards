'use strict';

module.exports = function handler(request, reply) {
  request.cookieAuthDashboards.clear();

  return reply.redirect('/');
};
