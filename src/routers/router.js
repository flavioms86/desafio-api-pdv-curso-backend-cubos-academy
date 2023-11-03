const { testAPI, registerUser } = require("../controllers/testAPI");

const router = require("express").Router();

router.get("/api", testAPI);

router.post("/usuario", registerUser)

module.exports = router;
