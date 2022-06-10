const { genres } = require("../models");

module.exports = async (genreList, res) => {
  return Promise.all(
    genreList.map((genreName) => {
      return genres
        .findOrCreate({
          where: { genreName },
          attributes: ["genreName"],
          defaults: { genreName },
        })
        .then((result) => result[0].dataValues.genreName);
    }),
  );
};

/**
 * main page router
 * / => movie/{startIdx} => start index부터 20개의 영화를 보낸다.
 * movie db : start index 는 movie의 ID
 *
 *
 */

/*
 return Promise.all(
    genreList.map((genreName) => {
      return genres
        .findOne({ where: { genreName }, attributes: ["genreName"] })
        .then((result) => result.genreName);
    }),
  );

*/
