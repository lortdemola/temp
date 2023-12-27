import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";

const rankingSchema = new mongoose.Schema({
    idSocialMedia: {type: String},
    fullname: {type: String},
    score: {type: Number},
}, {
    collection: 'rankings'
});
rankingSchema.plugin(uniqueValidator);
const RankingModel = mongoose.model('rankings', rankingSchema);

async function query() {
    const result = await RankingModel.find({});
    {
        if (result) {
            return mongoConverter(result);
        }
    }
}
async function queryAllWithId(id) {
    return RankingModel.findOne({idSocialMedia: id}).then(function (result) {
        if (result) {
            return mongoConverter(result);
        }
    });
}
async function get(id) {
    return RankingModel.findOne({_id: id}).then(function (result) {
        if (result) {
            return mongoConverter(result);
        }
    });
}

async function createNewOrUpdate(data) {
    const ressult = await RankingModel.findOne({$or: [{idSocialMedia: data.idSocialMedia}]}).exec();
    if (ressult) {
        return false;
    } else {
        return Promise.resolve().then(() => {
            if (!data.id) {
                return new RankingModel(data).save().then(result => {
                    if (result[0]) {
                        return mongoConverter(result[0]);
                    }
                });
            } else {
                return RankingModel.findByIdAndUpdate(data.id, _.omit(data, 'id'), {new: true});
            }
        });
    }
}
async function ResetScoreAll() {
    console.log(RankingModel.updateMany({}, { score: 0 }));
    return RankingModel.updateMany({}, { score: 0 });
}
async function remove(id) {
    return RankingModel.deleteOne({_id: id});
}
export default {
    query: query,
    queryAllWithId: queryAllWithId,
    ResetScoreAll:ResetScoreAll,
    get: get,
    createNewOrUpdate: createNewOrUpdate,
    remove:remove,

    model: RankingModel
};
