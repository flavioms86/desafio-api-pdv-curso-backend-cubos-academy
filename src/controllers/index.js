const getAll = require("./categorias");
const { getUser, loginUser, registerUser, updateUser } = require("./usuarios");

module.exports = {
  getAll,
  getUser,
  loginUser,
  registerUser,
  updateUser,
};
