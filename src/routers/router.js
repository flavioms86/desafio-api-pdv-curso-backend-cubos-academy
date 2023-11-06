const { registerUser } = require("../controllers/usuarios");
const getAll = require("../controllers/categorias");
const testAPI = require("../controllers/testAPI");

const router = require("express").Router();

router.get("/api", testAPI);
router.get("/categoria", getAll);

router.post("/usuario", registerUser)

module.exports = router;
