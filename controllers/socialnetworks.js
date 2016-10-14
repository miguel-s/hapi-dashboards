'use strict';

module.exports = function handler(request, reply) {
  if (!request.query.city) Object.assign(request.query, { city: 'all' });
  if (!request.query.district) Object.assign(request.query, { district: 'all' });

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
      FROM [ibc_seg].[DM_PIVOTE_CRUZADOS_SOURCE] AS A
      LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT] AS B
      ON A.[CallID] = B.[CallID]
      LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_CODIGO_CENSAL] AS E
      ON A.[CallID] = E.[CallID]
      LEFT JOIN [ibc_seg].[DM_INE_CENSO_BARRIOS] AS F
      ON E.[CUSEC] = F.[CD_SECCION_CENSAL]
      WHERE ISNULL(B.[Municipio], '') LIKE ${request.query.city === 'all' ? '%' : request.query.city}
            AND ISNULL(F.[N_Distri], '') LIKE ${request.query.district === 'all' ? '%' : request.query.district}
      ) AS Z
    WHERE [count_rrss] > 0
    GROUP BY [count_rrss]
    ORDER BY 1 DESC`;

  const totals = request.server.app.minsaitdb.query`
    SELECT  'twitter' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_TWITTER] AS A
    LEFT JOIN [ibc_seg].[DM_PIVOTE_CRUZADOS_SOURCE] AS B
    ON A.[id] = B.[idTwitter]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT] AS C
    ON B.[CallID] = C.[CallID]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_CODIGO_CENSAL] AS D
    ON B.[CallID] = D.[CallID]
    LEFT JOIN [ibc_seg].[DM_INE_CENSO_BARRIOS] AS E
    ON D.[CUSEC] = E.[CD_SECCION_CENSAL]
    WHERE ISNULL(C.[Municipio], '') LIKE ${request.query.city === 'all' ? '%' : request.query.city}
          AND ISNULL(E.[N_Distri], '') LIKE ${request.query.district === 'all' ? '%' : request.query.district}
    UNION ALL
    SELECT  'facebook' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_FACEBOOK] AS A
    LEFT JOIN [ibc_seg].[DM_PIVOTE_CRUZADOS_SOURCE] AS B
    ON A.[id] = B.[idFacebook]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT] AS C
    ON B.[CallID] = C.[CallID]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_CODIGO_CENSAL] AS D
    ON B.[CallID] = D.[CallID]
    LEFT JOIN [ibc_seg].[DM_INE_CENSO_BARRIOS] AS E
    ON D.[CUSEC] = E.[CD_SECCION_CENSAL]
    WHERE ISNULL(C.[Municipio], '') LIKE ${request.query.city === 'all' ? '%' : request.query.city}
          AND ISNULL(E.[N_Distri], '') LIKE ${request.query.district === 'all' ? '%' : request.query.district}
    UNION ALL
    SELECT  'fourqsuare' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_FOURSQUARE] AS A
    LEFT JOIN [ibc_seg].[DM_PIVOTE_CRUZADOS_SOURCE] AS B
    ON A.[id] = B.[id4Square]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT] AS C
    ON B.[CallID] = C.[CallID]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_CODIGO_CENSAL] AS D
    ON B.[CallID] = D.[CallID]
    LEFT JOIN [ibc_seg].[DM_INE_CENSO_BARRIOS] AS E
    ON D.[CUSEC] = E.[CD_SECCION_CENSAL]
    WHERE ISNULL(C.[Municipio], '') LIKE ${request.query.city === 'all' ? '%' : request.query.city}
          AND ISNULL(E.[N_Distri], '') LIKE ${request.query.district === 'all' ? '%' : request.query.district}
    UNION ALL
    SELECT  'yelp' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_YELP] AS A
    LEFT JOIN [ibc_seg].[DM_PIVOTE_CRUZADOS_SOURCE] AS B
    ON A.[id] = B.[idYelp]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT] AS C
    ON B.[CallID] = C.[CallID]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_CODIGO_CENSAL] AS D
    ON B.[CallID] = D.[CallID]
    LEFT JOIN [ibc_seg].[DM_INE_CENSO_BARRIOS] AS E
    ON D.[CUSEC] = E.[CD_SECCION_CENSAL]
    WHERE ISNULL(C.[Municipio], '') LIKE ${request.query.city === 'all' ? '%' : request.query.city}
          AND ISNULL(E.[N_Distri], '') LIKE ${request.query.district === 'all' ? '%' : request.query.district}
    UNION ALL
    SELECT  'tripadvisor' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_TRIPADVISOR] AS A
    LEFT JOIN [ibc_seg].[DM_PIVOTE_CRUZADOS_SOURCE] AS B
    ON A.[id] = B.[idTrip]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT] AS C
    ON B.[CallID] = C.[CallID]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_CODIGO_CENSAL] AS D
    ON B.[CallID] = D.[CallID]
    LEFT JOIN [ibc_seg].[DM_INE_CENSO_BARRIOS] AS E
    ON D.[CUSEC] = E.[CD_SECCION_CENSAL]
    WHERE ISNULL(C.[Municipio], '') LIKE ${request.query.city === 'all' ? '%' : request.query.city}
          AND ISNULL(E.[N_Distri], '') LIKE ${request.query.district === 'all' ? '%' : request.query.district}
    UNION ALL
    SELECT  'michelin' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_MICHELIN] AS A
    LEFT JOIN [ibc_seg].[DM_PIVOTE_CRUZADOS_SOURCE] AS B
    ON A.[id] = B.[idMichelin]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT] AS C
    ON B.[CallID] = C.[CallID]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_CODIGO_CENSAL] AS D
    ON B.[CallID] = D.[CallID]
    LEFT JOIN [ibc_seg].[DM_INE_CENSO_BARRIOS] AS E
    ON D.[CUSEC] = E.[CD_SECCION_CENSAL]
    WHERE ISNULL(C.[Municipio], '') LIKE ${request.query.city === 'all' ? '%' : request.query.city}
          AND ISNULL(E.[N_Distri], '') LIKE ${request.query.district === 'all' ? '%' : request.query.district}
    UNION ALL
    SELECT  'repsol' AS [source],
            COUNT(DISTINCT [id]) AS [count]
    FROM [ibc_seg].[V_SOURCE_REPSOL] AS A
    LEFT JOIN [ibc_seg].[DM_PIVOTE_CRUZADOS_SOURCE] AS B
    ON A.[id] = B.[idRepsol]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT] AS C
    ON B.[CallID] = C.[CallID]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_CODIGO_CENSAL] AS D
    ON B.[CallID] = D.[CallID]
    LEFT JOIN [ibc_seg].[DM_INE_CENSO_BARRIOS] AS E
    ON D.[CUSEC] = E.[CD_SECCION_CENSAL]
    WHERE ISNULL(C.[Municipio], '') LIKE ${request.query.city === 'all' ? '%' : request.query.city}
          AND ISNULL(E.[N_Distri], '') LIKE ${request.query.district === 'all' ? '%' : request.query.district}`;

  const topTotal = request.server.app.minsaitdb.query`
    SELECT *
    FROM (
      SELECT TOP 3  'twitter' AS [source],
                    [name],
                    [score],
                    [statuses_count] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_TWITTER]
      ORDER BY 4 DESC) AS tw
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'facebook' AS [source],
                    [name],
                    [score],
                    [fan_count] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_FACEBOOK]
      ORDER BY 4 DESC) AS fb
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'foursquare' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_FOURSQUARE]
      ORDER BY 4 DESC) AS fs
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'yelp' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_YELP]
      ORDER BY 4 DESC) AS yp
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'tripadvisor' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_TRIPADVISOR]
      ORDER BY 4 DESC) AS ta
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'michelin' AS [source],
                    [name],
                    [score],
                    [stars] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_MICHELIN]
      ORDER BY 4 DESC) AS mi
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'repsol' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_REPSOL]
      ORDER BY 4 DESC) AS rp`;

  const topNew = request.server.app.minsaitdb.query`
    SELECT *
    FROM (
      SELECT TOP 3  'twitter' AS [source],
                    [name],
                    [score],
                    [statuses_count] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_TWITTER]
      ORDER BY 4 DESC) AS tw
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'facebook' AS [source],
                    [name],
                    [score],
                    [fan_count] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_FACEBOOK]
      ORDER BY 4 DESC) AS fb
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'foursquare' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_FOURSQUARE]
      ORDER BY 4 DESC) AS fs
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'yelp' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_YELP]
      ORDER BY 4 DESC) AS yp
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'tripadvisor' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_TRIPADVISOR]
      ORDER BY 4 DESC) AS ta
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'michelin' AS [source],
                    [name],
                    [score],
                    [stars] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_MICHELIN]
      ORDER BY 4 DESC) AS mi
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'repsol' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_REPSOL]
      ORDER BY 4 DESC) AS rp`;

  const topTrending = request.server.app.minsaitdb.query`
    SELECT *
    FROM (
      SELECT TOP 3  'twitter' AS [source],
                    [name],
                    [score],
                    [statuses_count] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_TWITTER]
      ORDER BY 4 DESC) AS tw
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'facebook' AS [source],
                    [name],
                    [score],
                    [fan_count] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_FACEBOOK]
      ORDER BY 4 DESC) AS fb
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'foursquare' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_FOURSQUARE]
      ORDER BY 4 DESC) AS fs
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'yelp' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_YELP]
      ORDER BY 4 DESC) AS yp
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'tripadvisor' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_TRIPADVISOR]
      ORDER BY 4 DESC) AS ta
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'michelin' AS [source],
                    [name],
                    [score],
                    [stars] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_MICHELIN]
      ORDER BY 4 DESC) AS mi
    UNION ALL
    SELECT *
    FROM (
      SELECT TOP 3  'repsol' AS [source],
                    [name],
                    [score],
                    [rating] AS [kpi],
                    [evo]
      FROM [ibc_seg].[V_SOURCE_REPSOL]
      ORDER BY 4 DESC) AS rp`;

  Promise.all([overview, totals, topTotal, topNew, topTrending])
  .then(values => reply.view('socialnetworks', {
    filters: request.query,
    overview: values[0],
    totals: values[1],
    topTotal: values[2].reduce((prev, curr) => {
      const row = { name: curr.name, score: curr.score, kpi: curr.kpi, evo: curr.evo };
      if (!prev[curr.source]) prev[curr.source] = [];
      prev[curr.source].push(row);
      return prev;
    }),
    topNew: values[3].reduce((prev, curr) => {
      const row = { name: curr.name, score: curr.score, kpi: curr.kpi, evo: curr.evo };
      if (!prev[curr.source]) Object.assign(prev, { [curr.source]: [] });
      prev[curr.source].push(row);
      return prev;
    }),
    topTrending: values[4].reduce((prev, curr) => {
      const row = { name: curr.name, score: curr.score, kpi: curr.kpi, evo: curr.evo };
      if (!prev[curr.source]) Object.assign(prev, { [curr.source]: [] });
      prev[curr.source].push(row);
      return prev;
    }),
  }))
  .catch(err => reply.view('socialnetworks', {
    error: err,
  }));
};
