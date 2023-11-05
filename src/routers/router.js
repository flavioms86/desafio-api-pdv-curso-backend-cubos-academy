const getAll = require("../controllers/categorias");
const testAPI = require("../controllers/testAPI");
const { userLogin } = require("../controllers/userLogin");
const {
  authenticateUser,
  validateUserSchema,
} = require("../middlewares/loginValidation");

const router = require("express").Router();

router.get("/api", testAPI);
router.post("/login", validateUserSchema, userLogin);

router.get("/categoria", getAll);

router.use(authenticateUser);

module.exports = router;
