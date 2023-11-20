const getAllcategory = require("./categorias");
const { getUser, loginUser, registerUser, updateUser } = require("./usuarios");
const { registerClient, updateClient, getClients, getDetailClient } = require("./clientes");
const { getOrder, getOrderId } = require("./pedidos");
const {
  registerProducts,
  updateProducts,
  deleteProducts,
  getProducts,
  getDetailProduct,
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
  getDetailProduct,
  getDetailClient,
  getOrder,
  getOrderId
};
