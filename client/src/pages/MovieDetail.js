import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";
import ReviewModal from "../components/ReviewModal";
import axios from "axios";
import Loading from "../components/Loading";

function MovieDetail({ isSignIn, movieData, fetchURL, userInfo }) {
  const [movieDetailData, setmovieDetailData] = useState({});
  const [reviewData, setReviewData] = useState({});
  const [openReview, setOpenReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const movieId = id.replace(/^\D+/g, ""); // replace all leading non-digits with nothing
  console.log("movieId :", movieId);

  const convertImgURL = (url) => {
    return url.includes("|") ? (url = url.split("|")[0]) : url;
  };

  window.scrollTo(0, 0);

  useEffect(() => {
    setLoading(true);
    const serverData = async () =>
      await axios
        .get(`${fetchURL}movies/${movieId}`)
        .then((res) => {
          console.log("response: ", res.data.data);
          const data = res.data.data;
          console.log("data: ", data);
          setmovieDetailData(data.movieInfo);
          setReviewData(data.reviews);
        })
        .then((res) => {
          setLoading(false);
        });
    serverData();
    console.log(movieDetailData);
  }, [movieId]);

  const creatStar = (score) => {
    let star = [];
    for (let i = 0; i < 5; i++) {
      if (i < score) {
        star.push(<span>⭐</span>);
      } else {
        star.push(<span className="empty_star">⭐</span>);
      }
    }
    return star;
  };

  const handleReviewModal = () => {
    if (isSignIn) {
      setOpenReview((openReview) => !openReview);
    } else {
      alert("리뷰 작성을 위해선 로그인이 필요합니다!");
    }
  };

  return loading === false ? (
    <div className="movieDetail_containter">
      <div className="movieDetail_box">
        <div className="poster_img_box">
          <img
            className="poster_img"
            src={
              movieDetailData.posterImg === null
                ? require("../images/no_image.png")
                : convertImgURL(movieDetailData.posterImg)
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = require("../images/no_image.png");
            }}
            alt="load_fail"
          />
          <div className="avg_score">
            방구석평점 / <span>⭐</span>
            {(reviewData.length === 0
              ? 0
              : reviewData.reduce((acc, cur) => {
                  return (acc += cur.movieScore);
                }, 0) / reviewData.length
            ).toFixed(1)}
          </div>
        </div>
        <div className="selectedMovie_info">
          <div className="selectedMovie_info info_title">
            {movieDetailData.title}
          </div>
          <div className="selectedMovie_genres">
            {movieDetailData.genre.split(",").map((el, idx) => {
              return (
                <div className="selectedMovie_genre_box" key={idx}>
                  {el}
                </div>
              );
            })}
          </div>
          <div className="selectedMovie_info info_text">
            {"제작연도 : " + movieDetailData.createdAt.substring(0, 10)}
          </div>
          <div className="selectedMovie_info info_text">
            {"상영시간 : " + movieDetailData.runtime + " m"}
          </div>
          <div className="selectedMovie_info info_text">
            출연배우 :
            {movieDetailData.actorName.split(",").map((el, idx) => {
              if (idx === movieDetailData.actorName.split(",").length - 1) {
                return " " + el;
              } else if (idx >= 6) {
                return " ";
              }
              return " " + el + ", ";
            })}
          </div>
          <div className="selectedMovie_info info_plot">
            {movieDetailData.plot + "..."}
          </div>
        </div>
      </div>
      <div className="info_to_comment_divider"></div>
      <div className="review_container">
        <div className="review_header">
          <div>Comments</div>
          <button className="write_review_btn" onClick={handleReviewModal}>
            리뷰쓰기
          </button>
        </div>
        {isSignIn ? (
          <ReviewModal
            openReview={openReview}
            handleReviewModal={handleReviewModal}
            userInfo={userInfo}
            fetchURL={fetchURL}
            movieId={movieId}
          />
        ) : (
          <div></div>
        )}
        <div className="review_box_container">
          {reviewData.length === 0 ? (
            <div className="no_review_box">
              <span className="no_review_text">
                아직 작성된 리뷰가 없습니다.
              </span>
              <img
                className="no_review_img"
                src={require("../images/no_reviews.png")}
                alt="no_review"
              />
            </div>
          ) : (
            reviewData.map((el, idx) => {
              return (
                <div className="review_box" key={idx}>
                  <div className="review_userInfo_header">
                    <div className="profile_name_wrapper">
                      <div className="review_box review_profile_box">
                        <img
                          src={require("../images/default_profile.png")}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevent loop
                            currentTarget.src = require("../images/default_profile.png");
                          }}
                          alt="load_fail"
                          className="review_profile_img"
                        />
                      </div>
                      <div className="review_userInfo_wrapper">
                        <div className="review_userInfo userName">
                          {el.userId}
                        </div>
                        <div className="review_userInfo creatd_At">
                          {el.updatedAt.substring(0, 10)}
                        </div>
                      </div>
                    </div>
                    <div className="review_score">
                      <fieldset className="review_score_fieldset">
                        <legend>평점 : {el.movieScore.toFixed(1)}</legend>
                        {creatStar(el.movieScore)}
                      </fieldset>
                    </div>
                  </div>
                  <div className="review_user_content">{el.comment}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading customText={"Loading..."} />
  );
}

export default MovieDetail;
