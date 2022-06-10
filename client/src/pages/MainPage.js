import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import UserMovieRender from "./UserMovieRender";

function MainPage({
  movieData,
  setMovieData,
  fetchURL,
  page,
  setPage,
  userInfo,
  isSignIn,
}) {
  const tmpMovieData = [...movieData];
  const [recentIsOn, setrecentOn] = useState(true);
  const [myGenreData, setMyGenreData] = useState([]);
  const [my_gerneIsOn, setmy_gerneOn] = useState(false);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    await axios.get(`${fetchURL}main/${page}`).then((res) => {
      const tmpData = res.data.data.movieInfo;
      if (tmpData.length === 0) {
        // GET 응답 객체에 영화 데이터가 없으면 (끝까지 다 검색한 경우)
        // useEffect에서 데이터를 불러오지 않음
        return;
      } else if (page === 1) {
        return setLoading(false);
      }
      setMovieData([...movieData, ...tmpData]);
      setLoading(false);
    });
    console.log("page : ", page);
    console.log(movieData.length);
    return;
  }, [page]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((page) => page + 1);
    }
  }, [inView, loading]);

  const handleRecentBtn = () => {
    if (!recentIsOn) {
      setrecentOn(true);
      setmy_gerneOn(false);
      console.log(page);
    }
  };

  const handleMy_gerneBtn = () => {
    if (!isSignIn) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (!my_gerneIsOn) {
      setmy_gerneOn(true);
      setrecentOn(false);
      const checkOverlap = (arr, val) => {
        return arr.some(function (arrVal) {
          return val === arrVal;
        });
      };
      const myGenreData = tmpMovieData.filter((el) => {
        const tmp = el.genre.split(",");
        const user_movie = tmp.filter((el) => checkOverlap(userInfo.genre, el));
        console.log("tmp :", user_movie);
        if (user_movie.length > 0) {
          return el;
        }
      });
      setMyGenreData(myGenreData);
      console.log("myGenreData", myGenreData);
    }
  };

  const convertImgURL = (url) => {
    return url.includes("|") ? (url = url.split("|")[0]) : url;
  };

  return (
    <div className="mainpage_container">
      <div className="select_option_container">
        <div className="select_option">
          <button
            className={
              "recently_update option_box " + (recentIsOn ? "click" : "none")
            }
            onClick={handleRecentBtn}
          >
            최근 업데이트
          </button>
          <button
            className={
              "my_gerne option_box " + (my_gerneIsOn ? "click" : "none")
            }
            onClick={handleMy_gerneBtn}
          >
            내 장르별 보기
          </button>
        </div>
      </div>
      <div className="op_to_movie_divider"></div>
      <div className="movieBox_container">
        {recentIsOn ? (
          movieData.map((el, idx) => {
            return (
              <Link to={`/movies/${el.id}`} key={idx}>
                <div
                  boxid={el.id}
                  className="movieBox"
                  onClick={() => console.log(`divbox idx : ${el.id}`)}
                  ref={ref}
                >
                  <div className="moviePoster">
                    <img
                      src={
                        el.posterImg === null
                          ? require("../images/no_image.png")
                          : convertImgURL(el.posterImg)
                      }
                      alt="no_image"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = require("../images/no_image.png");
                      }}
                      className="movie_poster_img"
                    />
                    <div className="movieTitle">{el.title}</div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <UserMovieRender myGenreData={myGenreData} />
        )}
      </div>
    </div>
  );
}

export default MainPage;
