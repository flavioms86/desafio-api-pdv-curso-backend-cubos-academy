const getAllcategory = require("./categorias");
const { getUser, loginUser, registerUser, updateUser } = require("./usuarios");
const { registerClient, updateClient, getClients, getDetailClient } = require("./clientes");
const {
  registerProducts,
  updateProducts,
  deleteProducts,
  getProducts,
  getDetailProduct,
} = require("./produtos");

const registerRequest  = require("./pedidos")

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
  getDetailProduct,
  getDetailClient,
  registerRequest
};
