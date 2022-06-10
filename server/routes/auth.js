const router = require("express").Router();
const singin = require("../controller/auth/singin");
const signout = require("../controller/auth/signout");
const signup = require("../controller/auth/signup");

router.post("/signin", singin);
router.post("/signup", signup);
router.post("/signout", signout);
// get router:useId use상세정보 마이페이지
// delete :userId user삭제 회원탈퇴
module.exports = router;
