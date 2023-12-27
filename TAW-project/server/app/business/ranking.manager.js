import RankingDAO from "../DAO/rankingDAO";

function create(context) {
    async function query() {
        let result = RankingDAO.query();
        if (result) {
            return result;
        }
    }
    async function queryAllWithId(id) {
        let result = RankingDAO.queryAllWithId(id.idSocialMedia);
        if (result) {
            return result;
        }
    }
    async function get(id) {
        let result = await RankingDAO.get(id);
        if (result) {
            return result;
        }
    }

    async function createNewOrUpdate(data) {
        let result = await RankingDAO.createNewOrUpdate(data);
        if (result) {
            return result;
        }
    }
    async function ResetScoreAll() {
        let result = await RankingDAO.ResetScoreAll();
        if (result) {
            return result;
        }
    }
    async function remove(id) {
        let result = await RankingDAO.remove(id);
        if (result) {
            return result;
        }
    }
    return {
        query: query,
        get: get,
        ResetScoreAll:ResetScoreAll,
        queryAllWithId: queryAllWithId,
        createNewOrUpdate: createNewOrUpdate,
        remove:remove,
    };
}

export default {
    create: create
};
