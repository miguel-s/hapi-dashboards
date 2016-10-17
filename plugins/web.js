'use strict';

const Joi = require('joi');

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(['vision', 'DashboardsAuthCookie'], internals.after);
  return next();
};

exports.register.attributes = {
  name: 'DashboardsWeb',
};

internals.after = (server, next) => {
  server.views({
    engines: {
      pug: {
        module: require('pug'),
        isCached: process.env.NODE_ENV === 'production',
      },
    },
    relativeTo: __dirname,
    path: '../views',
  });

  server.route([
    // authentication routes
    require('../routes/get_login.js'),
    require('../routes/post_login.js'),
    require('../routes/get_logout.js'),
    require('../routes/get_signup.js'),
    require('../routes/post_signup.js'),

    // web routes
    require('../routes/get_index.js'),
    require('../routes/get_socialnetworks_overview.js'),
    require('../routes/get_socialnetworks_venue.js'),
  ]);

  return next();
};
