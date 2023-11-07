const { registerUser, updateProfileUser } = require("../controllers/usuarios");
const getAll = require("../controllers/categorias");
const testAPI = require("../controllers/testAPI");
const { userLogin, userDetails } = require("../controllers/usuarios");
const authenticateUser = require("../middlewares/loginValidation");
const { bodyValidation } = require("../middlewares/joiValidation");
const joiSchemas = require("../utils/joi_shcemas/");

const router = require("express").Router();

router.get("/api", testAPI);
router.post("/login", bodyValidation(joiSchemas.userLogin), userLogin);
router.get("/categoria", getAll);

router.use(authenticateUser);
router.get("/usuario", userDetails);
router.post("/usuario", validateUserSchema, registerUser)
//router.post("/login", validateUserSchema, userLogin);
router.put("/usuario", updateProfileUser)

//router.use(authenticateUser);

router.get("/categoria", getAll);




module.exports = router;
