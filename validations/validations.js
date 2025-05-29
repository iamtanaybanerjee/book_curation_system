const validateUserBodyParams = (body) => {
  const errors = [];

  if (!body.username || typeof body.username !== "string")
    errors.push("Username is required and must be a string");
  if (!body.email || typeof body.email !== "string")
    errors.push("Email is required and must be a string");

  return errors;
};

const validateEmail = (email) => {
  return (
    typeof email === "string" && email.includes("@") && email.includes(".")
  );
};

const validateSearchTerm = (query) => {
  let error;

  if (!query) error = "search query is required";

  return error;
};

const validateBookId = (body) => {
  console.log("validateBookId function body", body);
  let error;

  if (!body.bookId) error = "Book id is required";

  return error;
};
module.exports = {
  validateUserBodyParams,
  validateEmail,
  validateSearchTerm,
  validateBookId,
};
