const getAllcategory = require("./categorias");
const { getUser, loginUser, registerUser, updateUser } = require("./usuarios");
const { registerClient, updateClient, getClients } = require("./clientes");
const {
  registerProducts,
  updateProducts,
  deleteProducts,
  getProducts,
} = require("./produtos");

module.exports = {
  getAllcategory,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  registerClient,
  updateClient,
  registerProducts,
  updateProducts,
  deleteProducts,
  getProducts,
  getClients,
};
