const {
  userLogin,
  userDetails,
  registerUser,
  updateUser,
} = require("../controllers/usuarios");
const getAll = require("../controllers/categorias");
const testAPI = require("../controllers/testAPI");
const authenticateUser = require("../middlewares/loginValidation");
const { bodyValidation } = require("../middlewares/joiValidation");
const joiSchemas = require("../utils/joi_schemas");

const router = require("express").Router();

router.get("/api", testAPI);
router.post("/login", bodyValidation(joiSchemas.userLogin), userLogin);
router.post("/usuario", bodyValidation(joiSchemas.userRegister), registerUser);
router.get("/categoria", getAll);

router.use(authenticateUser);

router.get("/usuario", userDetails);
router.put("/usuario", bodyValidation(joiSchemas.userRegister), updateUser);

module.exports = router;
