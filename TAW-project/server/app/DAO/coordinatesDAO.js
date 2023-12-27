import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";

const coordinatesSchema = new mongoose.Schema({
    idSocialMedia: {type: String},
    firstname: {type: String},
    latitude: {type: Number},
    longitude: {type: Number},
}, {
    collection: 'coordinatess'
});
coordinatesSchema.plugin(uniqueValidator);
const CoordinatesModel = mongoose.model('coordinatess', coordinatesSchema);

async function query() {
    const result = await CoordinatesModel.find({});
    {
        if (result) {
            return mongoConverter(result);
        }
    }
}

async function get(id) {
    return CoordinatesModel.findOne({_id: id}).then(function (result) {
        if (result) {
            return mongoConverter(result);
        }
    });
}

async function createNewOrUpdate(data) {
    return Promise.resolve().then(() => {
        if (!data.id) {
            return new CoordinatesModel(data).save().then(result => {
                if (result[0]) {
                    return mongoConverter(result[0]);
                }
            });
        } else {
            return CoordinatesModel.findByIdAndUpdate(data.id, _.omit(data, 'id'), {new: true});
        }
    });
}
async function remove(id) {
    return CoordinatesModel.deleteOne({_id: id});
}
export default {
    query: query,
    get: get,
    createNewOrUpdate: createNewOrUpdate,
    remove:remove,

    model: CoordinatesModel
};
