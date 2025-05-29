const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
require("pg");
const { addUser } = require("./controllers/userControllers");
const {
  searchBook,
  saveBook,
  addTagToBook,
} = require("./controllers/bookControllers");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/users", addUser);
app.get("/api/books/search", searchBook);
app.post("/api/books/save", saveBook);
app.post("/api/books/tag", addTagToBook);

sequelize
  .authenticate()
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log("Error in connecting to DB", error));

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
