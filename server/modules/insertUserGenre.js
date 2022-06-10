const { genresUsers } = require("../models");

module.exports = async (genresList, userId, movieId) => {
  // 2022-04-04 add movieId
  console.log(genresList);
  if (!userId) userId = null;
  if (!movieId) movieId = null;
  const genreObj = {
    userId,
    movieId,
  };
  return await Promise.all(
    genresList.map((genre) => {
      return genresUsers.create({
        userId: genreObj.userId,
        genreName: genre,
        movieId: genreObj.movieId,
      });
    }),
  );
};
