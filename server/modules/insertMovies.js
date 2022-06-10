/**
 * insert movies to db
 */

const { movies } = require("../models");

module.exports = async (movieList) => {
  return await Promise.all(
    movieList.map((movie) => {
      const dbmovie = movies.create({
        title: movie.title,
        titleEng: movie.titleEng,
        directorName: movie.directorName,
        actorName: movie.actorName,
        releaseDate: movie.releaseDate,
        plot: movie.plot,
        runtime: movie.runtime,
        rating: movie.rating,
        posterImg: movie.posterImg,
        startIdx: movie.startIdx,
        apiIdx: movie.apiIdx,
        genre: movie.genre,
      });
      dbmovie.genre = movie.genre;
      return dbmovie;
    }),
  );
};

/**
 * movielist를 인자로 받아 movies table에 저장 후 movielist를 저장한다.
 */
