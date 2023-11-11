const getAll = require("./categorias");
const { getUser, loginUser, registerUser, updateUser } = require("./usuarios");
const { registerProducts } = require("./produtos");

module.exports = {
  getAll,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  registerProducts
};
