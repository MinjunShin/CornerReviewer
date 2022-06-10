import React from "react";
import "./SignupModal.css";

function SignupModal({ handleModal, signupModal }) {
  return (
    <div
      className={signupModal ? "modal-background" : "modal-background hidden"}
    >
      <div className="modal-box">
        <div>✅ 회원가입 완료</div>

        <div>
          <p>Welcome Corner reviewer!</p>
        </div>

        <div className="button-container">
          <a href="/">
            <button onClick={handleModal}>확인</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
