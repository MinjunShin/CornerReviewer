const express = require("express");
const router = express.Router();
const mainRouter = require("./main");
const movieRouter = require("./movies");
const authRouter = require("./auth");
const userRouter = require("./users");
const testRouter = require("./test");

// root router
router.use("/main", mainRouter);
router.use("/auth", authRouter);
router.use("/movies", movieRouter);
router.use("/users", userRouter);
router.use("/test", testRouter);

module.exports = router;
