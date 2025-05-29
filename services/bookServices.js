const {
  User: UserModel,
  Book: BookModel,
  BookTag: BookTagModel,
  Tag: TagModel,
} = require("../models");

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

const doesTagExistForBook = async (body) => {
  console.log("doesTagExistForBook", body);
  try {
    const tagObj = await TagModel.findOne({
      where: {
        name: body.tagName,
      },
    });

    console.log("tagObj", tagObj);

    let bookTagObj;

    if (tagObj) {
      bookTagObj = await BookTagModel.findOne({
        where: {
          bookId: body.bookId,
          tagId: tagObj.id,
        },
      });
    }

    if (bookTagObj) return true;
    else return false;
  } catch (error) {
    throw error;
  }
};

const createTagForBook = async (body) => {
  console.log("abc");
  console.log(body.bookId);
  try {
    const tagObj = await TagModel.create({
      name: body.tagName,
    });

    const bookObj = await BookModel.findOne({
      where: {
        id: body.bookId,
      },
    });

    console.log("tagObj", tagObj);
    console.log("bookObj", bookObj);

    const bookTagObj = await BookTagModel.create({
      bookId: bookObj.id,
      tagId: tagObj.id,
    });

    console.log(bookTagObj);

    return tagObj;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  doesUserIdExist,
  doesBookExist,
  createBook,
  doesTagExistForBook,
  createTagForBook,
};
