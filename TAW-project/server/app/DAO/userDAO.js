import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';


const userRole = {
  admin: 'admin',
  user: 'user'
};

const userRoles = [userRole.admin, userRole.user];

const userSchema = new mongoose.Schema({
  idSocialMedia: { type: String, required: true},
  firstName: { type: String, required: true,},
  surname: { type: String,  required: true },
  name: { type: String, required: true },
  role: { type: String, enum: userRoles, default: userRole.user, required: false },
  personPhoto: { type: String, required: true },
  token: { type: String, required: true }
}, {
  collection: 'users'
});

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('users', userSchema);

async function createNewOrUpdate(user) {
  const ressult = await UserModel.findOne({$or: [{idSocialMedia: user.idSocialMedia}]}).exec();
  if (ressult) {
    console.log(ressult);
    return false;
  } else {
    return Promise.resolve().then(() => {
      if (!user.id) {

        return new UserModel(user).save().then(result => {
          if (result) {
            return mongoConverter(result);
          }
        });
      } else {
        return false;
      }
    }).catch(error => {
      if ('ValidationError' === error.name) {
        error = error.errors[Object.keys(error.errors)[0]];
        throw applicationException.new(applicationException.BAD_REQUEST, error.message);
      }
      throw error;
    });
  }

}
async function query() {
  const result = await UserModel.find({});
  {
    if (result) {
      return mongoConverter(result);
    }
  }
}
async function getByEmailOrName(name) {
  const result = await UserModel.findOne({ $or: [{ name: name }] });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function get(id) {
  const result = await UserModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function getById(id) {
  const ressult = await UserModel.findOne({$or: [{idSocialMedia: id.idSocialMedia}]}).exec();
  if (ressult) {
    console.log(ressult._id);
    return ressult._id;
  } else {
      return false;
  }
}
async function getuserById(id) {
  const ressult = await UserModel.findOne({$or: [{idSocialMedia: id.idSocialMedia}]}).exec();
  if (ressult) {
    console.log(ressult);
    return ressult;
  } else {
    return false;
  }
}
async function remove(id) {
  return UserModel.deleteOne({_id: id});
}
export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmailOrName: getByEmailOrName,
  getuserById:getuserById,
  getById:getById,
  query:query,
  get: get,
  remove:remove,

  userRole: userRole,
  model: UserModel
};
