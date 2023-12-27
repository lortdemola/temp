import business from '../business/business.container';
const rankingEndpoint = (router) => {
    router.get('/api/rankings', async (request, response, next) => {
        try {
            let result = await business.getRankingManager().query();
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.get('/api/ranking/:id', async (request, response, next) => {
        try {
            let result = await business.getRankingManager().query();
            response.status(200).send(result.find(obj => obj.id === request.params.id));
        } catch (error) {
            console.log(error);
        }
    });

    router.post('/api/rankings', async (request, response, next) => {
        try {
            const result = await business.getRankingManager(request).createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
    router.put('/api/MyRankings', async (request, response, next) => {
        try {
            const result = await business.getRankingManager(request).queryAllWithId(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
    router.put('/api/Reset', async (request, response, next) => {
        try {
            const result = await business.getRankingManager(request).ResetScoreAll();
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.delete('/api/rankings/:id', async (request, response, next) => {
        try {
            let result = await business.getRankingManager().remove(request.params.id);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
};
export default rankingEndpoint;
