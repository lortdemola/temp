import userEndpoint from './user.endpoint';
import rankingEndpoint from './ranking.endpoint';

const routes = function (router) {
    userEndpoint(router);
    rankingEndpoint (router);
};

export default routes;
