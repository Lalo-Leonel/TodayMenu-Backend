const router = require("express").Router();
const { create, list, show, update, destroy } = require("../controllers/menus");
const { auth } = require("../utils/auth");

router.route("/").post(auth, create).get(auth, list);
router.route("/:id").get(auth, show).put(auth, update).delete(auth, destroy);

module.exports = router;
