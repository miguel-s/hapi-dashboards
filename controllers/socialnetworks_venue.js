'use strict';

const Boom = require('boom');

module.exports = function handler(request, reply) {
  const sales = new Promise((resolve, reject) => {
    request.server.app.db.all('SELECT reference, sum_one_month_val_hl, sum_three_months_val_hl FROM sn_venues_sales WHERE cd_pdv = ? ORDER BY 3 DESC', request.params.id,
    (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

  const data = new Promise((resolve, reject) => {
    request.server.app.db.get('SELECT * FROM sn_venues_details WHERE id = ?', request.params.id,
    (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

  Promise.all([sales, data])
  .then((values) => {
    const [sales, data] = values;
    if (!data) return reply(Boom.notFound());
    return reply.view('socialnetworks_venue', Object.assign({}, { sales }, data));
  })
  .catch(err => reply(Boom.badImplementation(err)));
};
