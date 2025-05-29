const {
  validateSearchTerm,
  validateBookId,
} = require("../validations/validations");
const axiosInstance = require("../lib/axios.lib");
const {
  doesUserIdExist,
  doesBookExist,
  createBook,
  doesTagExistForBook,
  createTagForBook,
} = require("../services/bookServices");

const searchBook = async (req, res) => {
  const searchTerm = req.query.query;
  try {
    const error = validateSearchTerm(searchTerm);
    if (error) return res.status(400).json({ error });

    const response = await axiosInstance.get(
      `/books/v1/volumes?q=${searchTerm}`
    );

    if (response.data.items.length === 0)
      return res.status(404).json({ message: "No books are found" });

    const books = response.data.items.map((item) => {
      return {
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors[0],
        thumbnail: item.volumeInfo.imageLinks.thumbnail,
      };
    });

    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const saveBook = async (req, res) => {
  const body = req.body;
  try {
    const value = await doesUserIdExist(body.userId);
    if (value === false)
      return res.status(404).json({ error: "Invalid userId" });

    const value2 = await doesBookExist(body);
    if (value2 === true)
      return res.status(400).json({ error: "Book already exist" });

    const response = await createBook(body);

    return res
      .status(201)
      .json({ message: "Book saved successfully", book: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addTagToBook = async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const error = validateBookId(body);
    if (error) return res.status(400).json({ error });

    const value = await doesTagExistForBook(body);
    if (value === true)
      return res.status(400).json({ error: "Tag already exist for this book" });

    const response = await createTagForBook(body);

    return res.status(201).json({
      message: "Tag added successfully",
      tag: { id: response.id, bookId: body.bookId, name: response.name },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { searchBook, saveBook, addTagToBook };
