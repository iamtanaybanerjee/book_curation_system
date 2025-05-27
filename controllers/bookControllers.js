const { validateSearchTerm } = require("../validations/validations");
const axiosInstance = require("../lib/axios.lib");

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

module.exports = { searchBook };
