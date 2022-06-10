const { movies } = require("../models");

module.exports = async (reviewList) => {
  return Promise.all(
    reviewList.map(async (rv) => {
      const review = rv.dataValues;

      return await movies
        .findOne({
          where: { id: review.movieId },
          attributes: ["posterImg"],
        })
        .then((poster) => poster.dataValues.posterImg)
        .then((posterImg) => {
          return {
            reviewId: review.id,
            movieId: review.movieId,
            movieScore: review.movieScore,
            comment: review.comment,
            posterImg,
          };
        });
    }),
  );
};
