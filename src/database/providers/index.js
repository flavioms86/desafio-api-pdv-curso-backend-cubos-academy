const { getAllprovider, verifyCategoryProvider } = require("./categorias");

const {
  createUserProvider,
  getUserById,
  updateUserProvider,
  verifyUserProvider,
} = require("./usuarios");
const {
  createProductProvider,
  updateProductProvider,
  verifyProductsIdProvider,
  deleteProductProvider,
  getAllProducts,
  getAllProductsAndCategory,
} = require("./produtos");
const {
  verifyClientsProvider,
  verifyClientEmail,
  verifyClientCPF,
  createClientProvider,
  updateClientProvider,
  getAllClients
} = require("./clientes");

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
  verifyCategoryProvider,
  updateProductProvider,
  verifyProductsIdProvider,
  deleteProductProvider,
  getAllProducts,
  getAllProductsAndCategory,
  getAllClients
};
