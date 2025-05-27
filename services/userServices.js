const { User: UserModel } = require("../models");

const doesUserExist = async (body) => {
  try {
    const userObj = await UserModel.findOne({
      where: { username: body.username },
    });

    const userObj2 = await UserModel.findOne({
      where: { email: body.email },
    });

    if (userObj || userObj2) return true;
  } catch (error) {
    throw error;
  }
};

const createUser = async (body) => {
  try {
    const userObj = await UserModel.create(body);
    return userObj;
  } catch (error) {
    throw error;
  }
};

module.exports = { doesUserExist, createUser };
