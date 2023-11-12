const getAllprovider = require("./categorias");
const { createUserProvider, getUserById, updateUserProvider, verifyUserProvider } = require("./usuarios");
const { verifyProductsProvider, createProductProvider, updateProductProvider, verifyProductsUpdateProvider } = require("./produtos");

module.exports = {
  getAllprovider,
  createUserProvider,
  getUserById,
  updateUserProvider,
  verifyUserProvider,
  createProductProvider,
  verifyProductsProvider,
  updateProductProvider,
  verifyProductsUpdateProvider
};
