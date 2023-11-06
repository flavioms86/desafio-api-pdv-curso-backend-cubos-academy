const { registerUser, updateProfileUser } = require("../controllers/usuarios");
const getAll = require("../controllers/categorias");
const testAPI = require("../controllers/testAPI");
const { userLogin } = require("../controllers/userLogin");
const { authenticateUser, validateUserSchema } = require("../middlewares/loginValidation");

const router = require("express").Router();

router.get("/api", testAPI);
router.post("/usuario", validateUserSchema, registerUser)
router.post("/login", validateUserSchema, userLogin);
router.put("/usuario", updateProfileUser)

router.use(authenticateUser);

router.get("/categoria", getAll);




module.exports = router;
