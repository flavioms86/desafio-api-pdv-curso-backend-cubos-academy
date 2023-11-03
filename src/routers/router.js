const getAll = require("../controllers/categorias");
const testAPI = require("../controllers/testAPI");
const { userLogin } = require("../controllers/userLogin");
const { authenticateUser, validateUserSchema } = require("../middlewares/loginValidation");

const router = require("express").Router();


router.get("/api", testAPI);

router.use(validateUserSchema)

router.post("/login", userLogin);

router.use(authenticateUser);

router.get("/categoria", getAll);

module.exports = router;
