const { User: UserModel, Book: BookModel } = require("../models");

const doesUserIdExist = async (userId) => {
  try {
    const userObj = await UserModel.findOne({
      where: {
        id: userId,
      },
    });

    if (userObj) return true;
    else return false;
  } catch (error) {
    throw error;
  }
};

const doesBookExist = async (body) => {
  try {
    const bookObj = await BookModel.findOne({
      where: {
        userId: body.userId,
        title: body.title,
        author: body.author,
        thumbnail: body.thumbnail,
      },
    });

    if (bookObj) return true;
    else return false;
  } catch (error) {
    throw error;
  }
};

const createBook = async (body) => {
  try {
    const bookObj = await BookModel.create(body);
    return bookObj;
  } catch (error) {
    throw error;
  }
};

module.exports = { doesUserIdExist, doesBookExist, createBook };
