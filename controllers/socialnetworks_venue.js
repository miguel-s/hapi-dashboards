'use strict';

const Boom = require('boom');

module.exports = function handler(request, reply) {
  request.server.app.minsaitdb.query`
    SELECT  B.[TargetIDPdv] AS [id],
            B.[Punto de venta] AS [name],
            B.[Provincia] AS [province],
            B.[Municipio] AS [city],
            C.[ESPECIALIDAD_IBC] AS [segment],
            E.[N_Distri] AS [district],
            F.[lat],
            F.[lon],
            TW.[id] AS [tw_id],
            TW.[screen_name] AS [tw_screen_name],
            TW.[created_at] AS [tw_create_at],
            TW.[followers_count] AS [tw_followers_count],
            TW.[statuses_count] AS [tw_statuses_count],
            FB.[id] AS [fb_id],
            FB.[fan_count] AS [fb_fan_count],
            FS.[id] AS [fs_id],
            FS.[categories.0.name] AS [fs_category],
            FS.[stats.checkinsCount] AS [fs_checkins_count],
            FS.[stats.usersCount] AS [fs_users_count],
            FS.[stats.tipCount] AS [fs_tip_count],
            FS.[rating] AS [fs_rating],
            FS.[ratingSignals] AS [fs_rating_signals],
            YP.[id] AS [yp_id],
            YP.[categories.0.0] AS [yp_categories_1],
            YP.[categories.1.0] AS [yp_categories_2],
            YP.[categories.2.0] AS [yp_categories_3],
            YP.[categories.3.0] AS [yp_categories_4],
            YP.[categories.4.0] AS [yp_categories_5],
            YP.[review_count] AS [yp_review_count],
            YP.[rating] AS [yp_rating],
            TA.[id] AS [ta_id],
            TA.[ranking] AS [ta_ranking],
            TA.[cuisine] AS [ta_cuisine],
            TA.[rating] AS [ta_rating],
            TA.[numReviews] AS [ta_num_reviews],
            MI.[id] AS [mi_id],
            MI.[stars] AS [mi_stars],
            MI.[bib] AS [mi_bib],
            RP.[id] AS [rp_id],
            RP.[rating] AS [rp_rating]
    FROM [ibc_seg].[DM_PIVOTE_CRUZADOS_SOURCE] AS A
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT] AS B
    ON A.[CallID] = B.[CallID]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_ESPECIALIDAD_IBC] AS C
    ON A.[CallID] = C.[CallID]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_CODIGO_CENSAL] AS D
    ON A.[CallID] = D.[CallID]
    LEFT JOIN [ibc_seg].[DM_INE_CENSO_BARRIOS] AS E
    ON D.[CUSEC] = E.[CD_SECCION_CENSAL]
    LEFT JOIN [ibc_seg].[DM_MANPOWER_OUTPUT_LATLON] AS F
    ON A.[CallID] = F.[CallID]
    LEFT JOIN [ibc_seg].[V_SOURCE_TWITTER] AS TW
    ON A.[idTwitter] = TW.[id]
    LEFT JOIN [ibc_seg].[V_SOURCE_FACEBOOK] AS FB
    ON A.[idFacebook] = FB.[id]
    LEFT JOIN [ibc_seg].[V_SOURCE_FOURSQUARE] AS FS
    ON A.[id4Square] = FS.[id]
    LEFT JOIN [ibc_seg].[V_SOURCE_YELP] AS YP
    ON A.[idYelp] = YP.[id]
    LEFT JOIN [ibc_seg].[V_SOURCE_TRIPADVISOR] AS TA
    ON A.[idTrip] = TA.[id]
    LEFT JOIN [ibc_seg].[V_SOURCE_MICHELIN] AS MI
    ON A.[idMichelin] = MI.[id]
    LEFT JOIN [ibc_seg].[V_SOURCE_REPSOL] AS RP
    ON A.[idRepsol] = RP.[id]
    WHERE B.[TargetIDPdv] = ${request.params.id}`
  .then((rows) => {
    if (rows.length === 0) return reply(Boom.notFound());
    return reply.view('socialnetworks_venue', Object.assign({}, rows[0], {
      path: request.path,
    }));
  })
  .catch(err => reply(Boom.badImplementation()));
};
