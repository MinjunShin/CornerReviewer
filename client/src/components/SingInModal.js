import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

function SignInModal({
  handleModal,
  showModal,
  handleSignIn,
  isSignIn,
  userInfo,
  setUserInfo,
  fetchURL,
}) {
  const [id_pw, setId_Pw] = useState({ userId: " ", password: " " });
  const closeModal = () => {
    handleModal();
    const initial = document.querySelectorAll(".input_box");
    initial.forEach((el) => (el.value = ""));
  };

  useEffect(() => {
    const getUserInfo = async () => {
      await axios.get(`${fetchURL}users/${id_pw.userId}`).then((res) => {
        return console.log("userInfo :", res);
      });
    };
    getUserInfo();
  }, [setUserInfo]);

  const handleChange = (e) => {
    setId_Pw({
      ...id_pw,
      [e.target.name]: e.target.value,
    });
  };

  const signIn = async (e) => {
    console.log(id_pw);
    await axios
      .post(
        `${fetchURL}auth/signin`,
        {
          userId: id_pw.userId,
          password: id_pw.password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res);
        handleSignIn(res, id_pw.userId);
      })
      .then(async () => {
        await axios.get(`${fetchURL}users/${id_pw.userId}`).then((res) => {
          console.log("userInfo by SignIn axios :", res.data);
          setUserInfo(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
        alert("로그인 정보가 일치하지 않습니다!");
      });
  };

  return (
    <div className={showModal ? "showModal_window open" : "showModal_window"}>
      <div className="modal_container">
        <header>
          <img
            src={require("../images/logo.png")}
            alt="img load fail"
            className="logo"
          ></img>
          <button className="close_btn" onClick={closeModal}>
            ✕
          </button>
        </header>
        <div className="modal_text">Login to Corner Reviewer!</div>
        <main>
          <form>
            <input
              type="text"
              name="userId"
              className="input_box id"
              placeholder="아이디"
              onChange={(e) => handleChange(e)}
            ></input>
            <input
              type="password"
              name="password"
              className="input_box pw"
              placeholder="비밀번호"
              onChange={(e) => handleChange(e)}
            ></input>
          </form>
          <button
            className="modal_btn sign_in"
            onClick={(e) => {
              signIn();
              closeModal();
            }}
          >
            Sign In
          </button>
          <div className="ask_sign">아직 회원 가입을 하지 않으셨나요?</div>
          <a href="/signup">
            <button className="modal_btn sign_up">Sign Up</button>
          </a>
        </main>
        <section className=""></section>
      </div>
    </div>
  );
}

export default SignInModal;
