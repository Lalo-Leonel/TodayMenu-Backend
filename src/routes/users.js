const router = require("express").Router();
const { list, show } = require("../controllers/users");
const { auth } = require("../utils/auth");

router.route("/").get(auth, list);
router.route("/:id").get(auth, show);

module.exports = router;
