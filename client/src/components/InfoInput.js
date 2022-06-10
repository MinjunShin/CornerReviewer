import React from "react";
import "./InfoInput.css";
import DropDown from "./DropDown";
import Modal_withdrawal from "../components/Modal_withdrawal";
import SignupModal from "./SingupModal";

function InfoInput({ loc, handleModal, withdrawalModal, signupModal }) {
  return (
    <div className="info-input-container">
      <div className="profile-input-container">
        <div className="profile-container">
          <div className="profile-img-container">
            <img
              className="profile-img"
              src={require("../static/sample4.jpeg")}
            />
          </div>
          <div className="profile-button-container">
            <button className="profile-upload-button">Image 업로드</button>
          </div>
        </div>

        <div className="input-container">
          <span
            className="input-span"
            style={loc === "signup" ? null : { display: "none" }}
          >
            <span className="label-box">
              <label htmlFor="id">ID : </label>
            </span>
            <span>
              <input type="text" id="id"></input>
              <span className="valid-check check-id">중복된 아이디입니다.</span>
            </span>
          </span>

          <span className="input-span">
            <span className="label-box">
              <label htmlFor="email">E-mail : </label>
            </span>

            <span>
              <input type="email" id="email"></input>
              <span className="valid-check check-email">
                중복된 이메일입니다.
              </span>
            </span>
          </span>

          <span className="input-span">
            <span className="label-box">
              <label htmlFor="psw">비밀번호 : </label>
            </span>
            <span>
              <input type="password" id="psw"></input>
              <span className="valid-check check-ps"></span>
            </span>
          </span>

          <span className="input-span">
            <span className="label-box">
              <label htmlFor="psw-check">비밀번호 확인 : </label>
            </span>
            <span>
              <input type="password" id="psw-check"></input>
              <span className="valid-check" check-psw>
                비밀번호가 일치하지 않습니다.
              </span>
            </span>
          </span>
        </div>
      </div>

      <div className="genre-container">
        <div className="desc">
          <span> 나만의 장르 / 최대 4개까지 선택 가능합니다. </span>
        </div>

        <div className="genre-box">
          <DropDown />
          <DropDown />
          <DropDown />
          <DropDown />
        </div>
      </div>

      <div
        className="signup-container"
        style={loc === "signup" ? { width: "300px" } : { width: "400px" }}
      >
        <a href="/">
          <button className="back-btn">돌아가기</button>
        </a>
        <button
          className="fixup-btn"
          style={loc === "signup" ? { display: "none" } : null}
        >
          수정완료
        </button>
        <button
          className="signup-btn"
          style={loc === "signup" ? null : { display: "none" }}
          onClick={handleModal}
        >
          회원가입
        </button>
        <button
          className="withdrawal-btn"
          style={loc === "signup" ? { display: "none" } : null}
          onClick={handleModal}
        >
          회원탈퇴
        </button>
      </div>
      {withdrawalModal ? (
        <Modal_withdrawal
          handleModal={handleModal}
          withdrawalModal={withdrawalModal}
        />
      ) : null}
      {signupModal ? (
        <SignupModal handleModal={handleModal} signupModal={signupModal} />
      ) : null}
    </div>
  );
}

export default InfoInput;
