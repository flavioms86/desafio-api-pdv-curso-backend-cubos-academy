const { getAllprovider, verifyCategoryProvider } = require("./categorias");
const { getAllOrder } = require("./pedidos");

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
  getProduct,
  getAllProducts,
  getAllProductsAndCategory,
  updateProductImage,
} = require("./produtos");
const {
  verifyClientsProvider,
  verifyClientEmail,
  verifyClientCPF,
  createClientProvider,
  updateClientProvider,
  getClient,
  getAllClients,
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
  updateClientProvider,
  verifyProductsIdProvider,
  deleteProductProvider,
  getProduct,
  getAllProducts,
  getAllProductsAndCategory,
  getClient,
  getAllClients,
  getAllOrder
};
