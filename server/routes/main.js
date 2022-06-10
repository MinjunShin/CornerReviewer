const router = require("express").Router();
const getMovieList = require("./../controller/movie/getMovieList");
router.get("/:page", getMovieList);
router.get("/:genre", getMovieList); // main/:genre
module.exports = router;
