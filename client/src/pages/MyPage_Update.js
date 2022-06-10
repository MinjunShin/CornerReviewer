import React, { useState } from "react";
import InfoInput from "../components/InfoInput";
import "./MyPage_Update.css";

function MyPage_Update() {
  const loc = "mypage";
  const [isModalClicked, setisModalClicked] = useState(false);

  const handleModal = () => {
    setisModalClicked((isModalClicked) => !isModalClicked);
  };

  return (
    <div className="Mypage_Update-page">
      <InfoInput
        loc={loc}
        handleModal={handleModal}
        withdrawalModal={isModalClicked}
        signupModal={false}
      />
      ;
    </div>
    // <div className="MyPage_Update-page">
    //   <div className="info-input-container">
    //     <div className="profile-input-container">
    //       <div className="profile-container">
    //         <div className="profile-img-container">
    //           <img
    //             className="profile-img"
    //             src={require("../static/sample3.jpeg")}
    //           />
    //         </div>
    //         <div className="profile-button-container">
    //           <button className="profile-upload-button">Image 업로드</button>
    //         </div>
    //       </div>

    //       <div className="input-container">
    //         <span className="input-span">
    //           <span className="label-box">
    //             <label htmlFor="email">E-mail : </label>
    //           </span>
    //           <span>
    //             <input type="email" id="email"></input>
    //             <span className="valid-check check-email">
    //               중복된 아이디입니다.
    //             </span>
    //           </span>
    //         </span>

    //         <span className="input-span">
    //           <span className="label-box">
    //             <label htmlFor="psw">비밀번호 : </label>
    //           </span>
    //           <span>
    //             <input type="password" id="psw"></input>
    //             <span className="valid-check check-ps"></span>
    //           </span>
    //         </span>

    //         <span className="input-span">
    //           <span className="label-box">
    //             <label htmlFor="psw-check">비밀번호 확인 : </label>
    //           </span>
    //           <span>
    //             <input type="password" id="psw-check"></input>
    //             <span className="valid-check" check-psw>
    //               중복된 아이디입니다.
    //             </span>
    //           </span>
    //         </span>
    //       </div>
    //     </div>

    //     <div className="genre-container">
    //       <div className="desc">
    //         <span> 나만의 장르 / 최대 4개까지 선택 가능합니다. </span>
    //       </div>

    //       <div className="genre-box">
    //         <DropDown />
    //         <DropDown />
    //         <DropDown />
    //         <DropDown />
    //       </div>
    //     </div>

    //     <div className="fixup-container">
    //       <button className="back-btn">돌아가기</button>
    //       <button className="fixup-btn">수정완료</button>
    //       <button
    //         className="withdrawal-btn"
    //         onClick={() => {
    //           setisModalClicked(true);
    //         }}
    //       >
    //         회원탈퇴
    //       </button>
    //     </div>
    //   </div>

    //   {isModalClicked ? <Modal_withdrawal handleModal={handleModal} /> : null}
    // </div>
  );
}

export default MyPage_Update;
