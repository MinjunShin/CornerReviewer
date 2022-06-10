const router = require("express").Router();
const getMovieDetail = require("./../controller/movie/getMovieDetail");
const postReview = require("./../controller/movie/postReview");

router.get("/:movieId", getMovieDetail);
router.post("/:movieId/users/:userId", postReview);

module.exports = router;
