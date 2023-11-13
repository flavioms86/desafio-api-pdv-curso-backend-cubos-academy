const getAll = require("./categorias");
const { getUser, loginUser, registerUser, updateUser } = require("./usuarios");
const { registerProducts, updateProducts, deleteProducts } = require("./produtos");
const { registerClient, updateClient } = require("./clientes")

module.exports = {
  getAll,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  registerClient,
  updateClient,
  registerProducts,
  updateProducts,
  deleteProducts
};
