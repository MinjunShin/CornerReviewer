const getMovieapi = require("../../modules/getMovieapi");
const insertMovies = require("../../modules/insertMovies");
const insertUsersGenre = require("../../modules/insertUserGenre");
const { movies } = require("../../models");
const getGenres = require("../../modules/getGenres");

module.exports = async (req, res) => {
  const startPage = Number(req.params.page);
  const count = 20;
  // const startIdx_delete = (startPage - 1) * count + startPage;
  // 위의 방법이 아니라 아래처럼 starfIdx는 db에 저장된 마지막 data의 apiIdx +1 이여야 한다.
  const startIdx = (await movies.max("apiIdx")) + 1;
  console.log(startIdx);

  // db에서 start page 조회 후 있다면 출력, 없다면 api 출력
  return movies
    .findAll({ where: { startIdx: startPage } })
    .then((result) => {
      if (!result.length) {
        // 없다면 api call
        return getMovieapi(startPage, startIdx, count)
          .then((movielist) => {
            return insertMovies(movielist).then((dbmovies) => {
              const response = {
                data: {
                  movieInfo: dbmovies,
                },
                message: "successfully completed",
              };
              // genre도 없다면 상성하고 ganresUsers table에 추가 해야한다.
              dbmovies.forEach((mv) => {
                const genresList = mv.genre.split(",");
                const movieId = mv.id;
                getGenres(genresList, res).then(() => {
                  insertUsersGenre(genresList, null, movieId);
                });
              });

              return response;
            });
          })
          .then((response) => res.status(200).send(response));
      } else {
        const response = {
          data: {
            movieInfo: result,
          },
          message: "successfully completed",
        };
        return res.status(200).send(response);
      }
    })
    .catch((err) => console.error(err));
};

/**
 *
 * 1.endpoint의 queyparams의 startid로 movies table에서 찾는다.
 * 2. 있다면 20개의 data를 response로 보내준다.
 *
 * 3. 없다면 api로부터 요청 후 DB에 저장하고 response로 보내준다.,
 * getMovieapi
 *
 * insertMovie
 * movie table에 DB를 저장한다. create된 Movie들의 list가 return 된다.
 *
 *
 * insertGenres
 * genre 를 Movie ID와 함께 저장한다
 */
