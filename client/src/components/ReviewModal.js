import React, { useState } from "react";
import axios from "axios";

function ReviewModal({
  openReview,
  handleReviewModal,
  userInfo,
  fetchURL,
  movieId,
}) {
  const [score, setScore] = useState(0);
  const [review, setReview] = useState("");
  const [star, setStar] = useState([false, false, false, false, false]);
  const handleClicked = (e, index) => {
    e.preventDefault();
    let clicked_star = [...star];
    for (let i = 0; i < star.length; i++) {
      if (i <= index) {
        clicked_star[i] = true;
      } else {
        clicked_star[i] = false;
      }
    }
    setStar(clicked_star);
    let userScore = clicked_star.filter((el) => {
      if (el === true) return el;
    });
    console.log(userScore);
    setScore(userScore.length);
  };

  const closeModal = () => {
    handleReviewModal();
  };

  const createReview = () => {
    axios
      .post(`${fetchURL}movies/${movieId}/users/${userInfo.userId}`, {
        movieScore: score,
        comment: review,
      })
      .then(() => {
        closeModal();
        window.location.reload();
      });
  };

  return (
    <div
      className={
        openReview === true
          ? "show_Modal_window_review open"
          : "show_Modal_window_review"
      }
    >
      <div className="modal_container_review">
        <div className="header">
          <div className="close_btn_wrapper">
            <button className="close_btn" onClick={closeModal}>
              ✕
            </button>
          </div>
          <span className="write_review_headerText">
            방구석 리뷰를 작성해주세요!
          </span>
          <div className="star_container">
            <span
              className={star[0] ? "clicked_star" : "unclicked_star"}
              onClick={(e) => handleClicked(e, 0)}
            >
              ⭐
            </span>
            <span
              className={star[1] ? "clicked_star" : "unclicked_star"}
              onClick={(e) => handleClicked(e, 1)}
            >
              ⭐
            </span>
            <span
              className={star[2] ? "clicked_star" : "unclicked_star"}
              onClick={(e) => handleClicked(e, 2)}
            >
              ⭐
            </span>
            <span
              className={star[3] ? "clicked_star" : "unclicked_star"}
              onClick={(e) => handleClicked(e, 3)}
            >
              ⭐
            </span>
            <span
              className={star[4] ? "clicked_star" : "unclicked_star"}
              onClick={(e) => handleClicked(e, 4)}
            >
              ⭐
            </span>
            <span className="show_score">{" " + score.toFixed(1)}</span>
          </div>
        </div>
        <form className="write_review_box">
          <input
            type="text"
            className="write_review_input"
            onChange={(e) => setReview(e.target.value)}
          ></input>
          <button
            type="button"
            className="upload_review_btn"
            onClick={() => createReview()}
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
