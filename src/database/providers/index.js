const getAllprovider = require("./categorias");
const { createUserProvider, getUserById, updateUserProvider, verifyUserProvider } = require("./usuarios");
const { verifyProductsProvider, createProductProvider, updateProductProvider, verifyProductsIdProvider, deleteProductProvider } = require("./produtos");

module.exports = {
  getAllprovider,
  createUserProvider,
  getUserById,
  updateUserProvider,
  verifyUserProvider,
  createProductProvider,
  verifyProductsProvider,
  updateProductProvider,
  verifyProductsIdProvider,
  deleteProductProvider
};
