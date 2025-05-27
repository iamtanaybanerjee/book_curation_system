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

module.exports = { validateUserBodyParams, validateEmail };
