import userManager from './user.manager';
import rankingManager from "./ranking.manager";
import coordinatesManager from "./coordinates.manager";


function getter(manager, request) {
    return function () {
        return manager.create(request, this);
    };
}

export default {
    getUserManager: getter(userManager),
    getRankingManager: getter(rankingManager),
    getCoordinatesManager: getter(coordinatesManager)
};
