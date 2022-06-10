const router = require("express").Router();
const getMovieDetail = require("./../controller/movie/getMovieDetail");
router("/", getMovieDetail);
router("");

module.exports = router;
