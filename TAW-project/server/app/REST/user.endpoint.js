import business from '../business/business.container';
import applicationException from '../service/applicationException';
import auth from '../middleware/auth';

const userEndpoint = (router) => {

    router.get('/api/users', async (request, response, next) => {
        try {
            let result = await business.getRankingManager().query();
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.post('/api/user/create', async (request, response, next) => {
        try {
           console.log(request.body);
            const result = await business.getUserManager(request).createNewOrUpdate(request.body);

            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
    router.put('/api/user/get/:id', async (request, response, next) => {
        try {

            const result = await business.getUserManager(request).getById(request.body);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.put('/api/user/get_all/:id', async (request, response, next) => {
        try {

            const result = await business.getUserManager(request).getuserById(request.body);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.delete('/api/user/user_del/:userId', async (request, response, next) => {
        try {
            let result = await business.getUserManager().remove(request.params.userId);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.delete('/api/user/logout/:userId', auth, async (request, response, next) => {
        try {
            let result = await business.getUserManager(request).removeHashSession(request.body.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });


};

export default userEndpoint;
