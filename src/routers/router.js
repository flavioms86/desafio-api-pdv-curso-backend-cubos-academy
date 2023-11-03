const testAPI = require("../controllers/testAPI");

const router = require("express").Router();

router.get("/api", testAPI);

module.exports = router;
