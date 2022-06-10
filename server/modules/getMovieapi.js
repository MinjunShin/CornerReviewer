const axios = require("axios");
require("dotenv").config();
/**
 * get movie data from api and filter data
 */
module.exports = async (startPage, start, count) => {
  const makeApiUrl = (start, count) => {
    const params = encodeURI(
      `startCount=${start}&listCount=${count}&type=극영화&releaseDts=2022-01-01`,
    );

    const apiUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.APIKEY}&${params}`;
    return apiUrl;
  };

  const genreExtract =
    /드라마|첩보|옴니버스|뮤직|로드무비|아동|청춘영화|재난|문예|신파|군사|스포츠|종교|무협|미스터리|SF|코메디|느와르|액션|범죄|어드벤처|가족|멜로|로맨스|공포|뮤지컬|시대극|사극|실험|스릴러|전쟁|판타지/g;

  // const posterRegEx = /(.*)(?=\|)|(.*)/;
  const filterPosterImg = (url) => {
    return url.split("|")[0];
  };

  const Movie = class {
    constructor(
      title,
      titleEng,
      directorName,
      actorName,
      releaseDate,
      plot,
      runtime,
      rating,
      genre,
      posterImg,
      startIdx,
      apiIdx,
    ) {
      this.title = title;
      this.titleEng = titleEng;
      this.directorName = directorName;
      this.actorName = actorName;
      this.releaseDate = releaseDate;
      this.plot = plot;
      this.runtime = runtime;
      this.rating = rating;
      this.genre = genre;
      this.posterImg = posterImg;
      this.startIdx = startIdx;
      this.apiIdx = apiIdx;
    }
  };

  // get api data and filter api data
  const filterApiData = async (startPage, start, count) => {
    return await axios
      .get(makeApiUrl(start, count), { withCredentials: true }) // get api data
      .then((response) => {
        return response.data.Data[0].Result;
      })
      .then((data) => {
        const movieArr = [];
        data.forEach((movie, idx) => {
          if (genreExtract.test(movie.genre)) {
            const directors = movie.directors.director
              .map((dir) => dir.directorEnNm)
              .join(",");
            const actors = movie.actors.actor
              .map((act) => act.actorEnNm)
              .join(",");
            const apiIdx = start + idx;

            // const postersReg = movie.posters.match(posterRegEx);
            const posterImgFilter = filterPosterImg(movie.posters);
            const posters = posterImgFilter ?? null;

            const newMovie = new Movie(
              movie.title,
              movie.titleEng,
              directors,
              actors,
              movie.releaseDate,
              movie.plots.plot[0].plotText,
              movie.runtime,
              movie.rating,
              movie.genre,
              posters,
              startPage,
              apiIdx,
            );
            movieArr.push(newMovie);
          }
        });
        return movieArr;
      });
  };

  // get 20ea api data and filter
  const movieApicall = async (startPage, startIdx, count) => {
    return filterApiData(startPage, startIdx, count).then((list) => {
      const movieList = [];
      movieList.push(...list);

      const length = list.length;
      const newCount = count - length;
      let newStartIdx;

      if (newCount > 0) {
        // movieList.push(movieApicall(newStartIdx, newCount));
        if (length !== 0) {
          newStartIdx = list[length - 1].apiIdx + 1;
        } else {
          newStartIdx = startIdx;
        }

        return movieApicall(startPage, newStartIdx, newCount).then((lists) =>
          movieList.concat(lists),
        );
      }
      return movieList;
    });
  };

  return movieApicall(startPage, start, count);
};

/**
 *

 * movieApicall
 * movie data가 20개가(count) 될 때까지 호출하여 DB에 저장할 Data를 filter 한다.
 *
 *  * getMovieapi
 * - filterApiData
 *   api를 통해 filter 되지 않은 data를 가져온다.
 *   data를 filter하여 movie 객체 배열을 생성하고 return 한다.
 

 */

/*
  const numberedData = res.data.Data[0].Result;
        numberedData.map((el, idx) => {
          let index = idx + movieData.length;
          el.genre = el.genre.split(",");
          if (el.posters.includes("|")) {
            el.posters = el.posters.split("|")[0];
          }
          if (el.posters === "") {
            el.posters = "img/no_image.png";
          }
          return (el.id = index);
        });
        return setMovieData(numberedData);
      });


      "http://file.koreafilm.or.kr/thm/02/99/17/64/tn_DPF024991.jpg|http://file.koreafilm.or.kr/thm/02/99/17/57/tn_DPF024728.jpg|http://file.koreafilm.or.kr/thm/02/99/17/57/tn_DPF024729.jpg"
*/
