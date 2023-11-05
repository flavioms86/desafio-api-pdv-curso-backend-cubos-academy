const getAll = require("../controllers/categorias");
const testAPI = require("../controllers/testAPI");
const { userLogin } = require("../controllers/userLogin");
const authenticateUser = require("../middlewares/loginValidation");
const { bodyValidation } = require("../middlewares/joiValidation");
const joiSchemas = require("../utils/joi_shcemas/");

const router = require("express").Router();

router.get("/api", testAPI);
router.post("/login", bodyValidation(joiSchemas.userLogin), userLogin);

router.use(authenticateUser);
router.get("/categoria", getAll);

module.exports = router;
