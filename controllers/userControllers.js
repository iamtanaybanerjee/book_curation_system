const {
  validateUserBodyParams,
  validateEmail,
} = require("../validations/validations");
const { doesUserExist, createUser } = require("../services/userServices");

const addUser = async (req, res) => {
  const body = req.body;
  try {
    const errors = validateUserBodyParams(body);
    if (errors.length > 0) return res.status(400).json({ error: errors });

    const value = validateEmail(body.email);
    if (value === false)
      return res.status(400).json({ error: "Invalid email" });

    const value2 = await doesUserExist(body);
    if (value2 === true)
      return res.status(400).json({ error: "Username or email already exist" });

    const user = await createUser(body);

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { addUser };
