const getAllprovider = require("./categorias");
const { createUserProvider, getUserById, updateUserProvider, verifyUserProvider } = require("./usuarios");
const { verifyProductsProvider, createProductProvider, updateProductProvider, verifyProductsIdProvider, deleteProductProvider } = require("./produtos");
const { verifyClientsProvider, verifyClientEmail, verifyClientCPF, createClientProvider, updateClientProvider } = require ("./clientes")

module.exports = {
  getAllprovider,
  createUserProvider,
  getUserById,
  updateUserProvider,
  verifyUserProvider,
  verifyClientsProvider,
  verifyClientEmail,
  verifyClientCPF,
  createClientProvider,
  updateClientProvider,
  createProductProvider,
  verifyProductsProvider,
  updateProductProvider,
  verifyProductsIdProvider,
  deleteProductProvider
};
