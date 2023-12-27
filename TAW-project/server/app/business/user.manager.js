

import UserDAO from '../DAO/userDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';
import RankingDAO from "../DAO/rankingDAO";
import userDAO from "../DAO/userDAO";

function create(context) {

  function hashString(password) {
    return sha1(password);
  }


  async function query() {
    let result = UserDAO.query();
    if (result) {
      return result;
    }
  }

  async function createNewOrUpdate(userData) {
    const user = await UserDAO.createNewOrUpdate(userData);
    if (await userData.password) {
      return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
    } else {
      return user;
    }
  }


  async function remove(id) {
    let result = await userDAO.remove(id);
    if (result) {
      return result;
    }
  }
  async function getById(id) {
    let result = await userDAO.getById(id);
    if (result) {
      return result;
    }
  }
  async function getuserById(id) {
    let result = await userDAO.getuserById(id);
    if (result) {
      return result;
    }
  }
  return {
    query: query,
    remove:remove,
    getById:getById,
    getuserById:getuserById,
    createNewOrUpdate: createNewOrUpdate,

  };
}

export default {
  create: create
};
