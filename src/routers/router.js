const testAPI = require("../controllers/testAPI");
const {userLogin} = require("../controllers/userLogin");

const router = require("express").Router();

router.get("/api", testAPI);
router.post("/login", userLogin);

module.exports = router;
