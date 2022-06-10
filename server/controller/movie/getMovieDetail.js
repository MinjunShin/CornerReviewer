const { movies, reviews } = require("../../models");

module.exports = async (req, res) => {
  const movieId = req.params.movieId;

  // movie table에서 해당 movie id 정보를 가져온다.
  try {
    const movieInfo = await movies.findOne({ where: { id: movieId } });
    const reviewList = await reviews.findAll({ where: { movieId } });

    const response = {
      data: {
        movieInfo: movieInfo.dataValues,
        reviews: reviewList ?? null,
      },
      message: "successfully completed",
    };
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
