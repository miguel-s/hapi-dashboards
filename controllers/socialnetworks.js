'use strict';

module.exports = function handler(request, reply) {
  const overview = request.server.app.minsaitdb.query`
    SELECT  [count_rrss],
            COUNT(*) AS [count]
    FROM (
      SELECT  CASE WHEN [idTwitter] IS NOT NULL THEN 1 ELSE 0 END +
              CASE WHEN [idFacebook] IS NOT NULL THEN 1 ELSE 0 END +
              CASE WHEN [id4Square] IS NOT NULL THEN 1 ELSE 0 END +
              CASE WHEN [idYelp] IS NOT NULL THEN 1 ELSE 0 END +
              CASE WHEN [idTrip] IS NOT NULL THEN 1 ELSE 0 END +
              CASE WHEN [idMichelin] IS NOT NULL THEN 1 ELSE 0 END +
              CASE WHEN [idRepsol] IS NOT NULL THEN 1 ELSE 0 END
              AS [count_rrss]
      FROM [ibc_seg].[DM_PIVOTE_CRUZADOS_SOURCE]) AS A
    WHERE [count_rrss] > 0
    GROUP BY [count_rrss]
    ORDER BY 1 DESC`;

  const totals = request.server.app.minsaitdb.query`
    SELECT  'twitter' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_TWITTER]
    UNION ALL
    SELECT  'facebook' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_FACEBOOK]
    UNION ALL
    SELECT  'fourqsuare' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_FOURSQUARE]
    UNION ALL
    SELECT  'yelp' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_YELP]
    UNION ALL
    SELECT  'tripadvisor' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_TRIPADVISOR]
    UNION ALL
    SELECT  'michelin' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_MICHELIN]
    UNION ALL
    SELECT  'repsol' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_REPSOL]`;

  const topNew = request.server.app.minsaitdb.query`
    SELECT *
    FROM (
      SELECT TOP 3  'twitter' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_TWITTER]
      ORDER BY 3 DESC) AS tw
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'facebook' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_FACEBOOK]
      ORDER BY 3 DESC) AS fb
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'foursquare' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_FOURSQUARE]
      ORDER BY 3 DESC) AS fs
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'yelp' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_YELP]
      ORDER BY 3 DESC) AS yp
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'tripadvisor' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_TRIPADVISOR]
      ORDER BY 3 DESC) AS ta
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'michelin' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_MICHELIN]
      ORDER BY 3 DESC) AS mi
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'repsol' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_REPSOL]
      ORDER BY 3 DESC) AS rp`;

  const topTrendy = request.server.app.minsaitdb.query`
    SELECT *
    FROM (
      SELECT TOP 3  'twitter' AS [source],
                    [name],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_TWITTER]
      ORDER BY 3 DESC) AS tw
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'facebook' AS [source],
                    [name],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_FACEBOOK]
      ORDER BY 3 DESC) AS fb
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'foursquare' AS [source],
                    [name],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_FOURSQUARE]
      ORDER BY 3 DESC) AS fs
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'yelp' AS [source],
                    [name],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_YELP]
      ORDER BY 3 DESC) AS yp
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'tripadvisor' AS [source],
                    [name],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_TRIPADVISOR]
      ORDER BY 3 DESC) AS ta
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'michelin' AS [source],
                    [name],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_MICHELIN]
      ORDER BY 3 DESC) AS mi
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'repsol' AS [source],
                    [name],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_REPSOL]
      ORDER BY 3 DESC) AS rp`;

  const topDraft = request.server.app.minsaitdb.query`
    SELECT *
    FROM (
      SELECT TOP 3  'twitter' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_TWITTER]
      ORDER BY 3 DESC) AS tw
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'facebook' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_FACEBOOK]
      ORDER BY 3 DESC) AS fb
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'foursquare' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_FOURSQUARE]
      ORDER BY 3 DESC) AS fs
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'yelp' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_YELP]
      ORDER BY 3 DESC) AS yp
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'tripadvisor' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_TRIPADVISOR]
      ORDER BY 3 DESC) AS ta
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'michelin' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_MICHELIN]
      ORDER BY 3 DESC) AS mi
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'repsol' AS [source],
                    [name],
                    [rat]
      FROM [ibc_seg].[V_SOURCE_REPSOL]
      ORDER BY 3 DESC) AS rp`;

  Promise.all([overview, totals, topNew, topTrendy, topDraft])
  .then(values => reply.view('socialnetworks', {
    path: request.path,
    overview: values[0],
    totals: values[1],
    topNew: values[2].reduce((prev, curr) => {
      const row = { name: curr.name, rating: curr.rat };
      if (!prev[curr.source]) prev[curr.source] = [];
      prev[curr.source].push(row);
      return prev;
    }),
    topTrendy: values[3].reduce((prev, curr) => {
      const row = { name: curr.name, rating: curr.evo };
      if (!prev[curr.source]) prev[curr.source] = [];
      prev[curr.source].push(row);
      return prev;
    }),
    topDraft: values[4].reduce((prev, curr) => {
      const row = { name: curr.name, rating: curr.rat };
      if (!prev[curr.source]) prev[curr.source] = [];
      prev[curr.source].push(row);
      return prev;
    }),
  }))
  .catch(err => reply.view('socialnetworks', {
    path: request.path,
    error: err,
  }));
};
