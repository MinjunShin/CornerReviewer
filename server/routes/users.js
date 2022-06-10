const router = require("express").Router();
const getUserInfo = require("../controller/user/getUserInfo");
const patchUserInfo = require("../controller/user/patchUserInfo");
router.get("/:userId", getUserInfo);
router.patch("/:userId", patchUserInfo);
module.exports = router;
