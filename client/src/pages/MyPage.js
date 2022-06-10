import React from "react";
import "./MyPage.css";
import MasonryLayout from "../components/MasonryLayout";

function MyPage(props) {
  return (
    <div className="mypage">
      <div className="mypage-container">
        <div className="myprofile-info-container">
          <div className="myprofile-container">
            <div className="myprofile-img-container">
              <img
                className="myprofile-img"
                src={require("../static/sample2.jpg")}
              />
            </div>
          </div>

          <div className="info-container">
            <div className="username-update-container">
              <span>방구석 평론가 님</span>

              <a href="/mypage_update">
                <span>회원정보 수정</span>
              </a>
            </div>

            <div className="email-container">
              <span>e- mail : minjunGod@cornerreviewer.com </span>
            </div>

            <div className="mygenre-container">
              <div className="mygenre-desc">
                <span> 나만의 장르 </span>
              </div>

              <div className="mygenre-box">
                <button>1</button>
                <button>1</button>
                <button>1</button>
                <button>1</button>
              </div>
            </div>
          </div>
        </div>

        <div className="dashBoard-container">
          <MasonryLayout movieData={props.movieData} />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
