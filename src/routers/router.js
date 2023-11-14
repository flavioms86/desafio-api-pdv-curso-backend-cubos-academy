const controlador = require("../controllers");
const authenticateUser = require("../middlewares/loginValidation");
const { bodyValidation } = require("../middlewares/joiValidation");
const joiSchemas = require("../utils/joi_schemas");

const router = require("express").Router();

router.post("/login", bodyValidation(joiSchemas.userLogin), controlador.loginUser);
router.post("/usuario", bodyValidation(joiSchemas.userRegister), controlador.registerUser);
router.get("/categoria", controlador.getAll);

router.use(authenticateUser);

router.get("/usuario", controlador.getUser);
router.put("/usuario", bodyValidation(joiSchemas.userRegister), controlador.updateUser);

router.get("/produto", controlador.getProducts);
router.post("/produto", bodyValidation(joiSchemas.productsRegister), controlador.registerProducts);
router.put("/produto/:id", bodyValidation(joiSchemas.productsRegister), controlador.updateProducts);
router.delete("/produto/:id", controlador.deleteProducts);


module.exports = router;
