const router = require("express").Router();
const { create, list, show, update, destroy } = require("../controllers/business");
const { auth } = require("../utils/auth");
const { formData } = require("../utils/formData")

router.route("/").post(auth, formData, create).get(auth, list);
router.route("/:id").get(auth, show).put(auth, update).delete(auth, destroy);

module.exports = router;
