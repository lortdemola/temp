import CoordinatesDAO from "../DAO/coordinatesDAO";

function create(context) {
    async function query() {
        let result = CoordinatesDAO.query();
        if (result) {
            return result;
        }
    }

    async function get(id) {
        let result = await CoordinatesDAO.get(id);
        if (result) {
            return result;
        }
    }

    async function createNewOrUpdate(data) {
        let result = await CoordinatesDAO.createNewOrUpdate(data);
        if (result) {
            return result;
        }
    }
    async function remove(id) {
        let result = await CoordinatesDAO.remove(id);
        if (result) {
            return result;
        }
    }
    return {
        query: query,
        get: get,
        createNewOrUpdate: createNewOrUpdate,
        remove:remove,
    };
}

export default {
    create: create
};
