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
    {
      method: 'GET',
      path: '/login',
      config: {
        description: 'Returns a login form',
        auth: { strategy: 'dashboards-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: require('../controllers/login.js'),
      },
    },
    {
      method: 'POST',
      path: '/login',
      config: {
        description: 'Returns a login form',
        auth: { strategy: 'dashboards-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        validate: {
          payload: require('../models/user.js'),
          failAction: require('../controllers/login.js'),
        },
        handler: require('../controllers/login.js'),
      },
    },
    {
      method: 'GET',
      path: '/logout',
      config: {
        description: 'Logout user',
        handler: require('../controllers/logout.js'),
      },
    },
    {
      method: 'GET',
      path: '/signup',
      config: {
        description: 'Returns a sinup form',
        auth: { strategy: 'dashboards-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: require('../controllers/signup.js'),
      },
    },
    {
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
    },

    // web routes
    {
      method: 'GET',
      path: '/',
      config: {
        description: 'Returns the index page',
        auth: { strategy: 'dashboards-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: '/login' } },
        handler: require('../controllers/index.js'),
      },
    },
    {
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
    },
    {
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
    },
  ]);

  return next();
};
