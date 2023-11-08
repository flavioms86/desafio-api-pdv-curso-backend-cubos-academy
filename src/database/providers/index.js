const getAllprovider = require("./categorias");
const { createUserProvider, getUserById, updateUserProvider, verifyUserProvider } = require("./usuarios");

module.exports = {
  getAllprovider,
  createUserProvider,
  getUserById,
  updateUserProvider,
  verifyUserProvider,
};
