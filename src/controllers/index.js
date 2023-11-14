const getAllcategory = require("./categorias");
const { getUser, loginUser, registerUser, updateUser } = require("./usuarios");
const { registerProducts, updateProducts, deleteProducts } = require("./produtos");
const { registerClient,updateClient } = require("./clientes");

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
};
