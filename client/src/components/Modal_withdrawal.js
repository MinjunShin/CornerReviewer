import React from "react";
import "./Modal_withdrawal.css";

function Modal_withdrawal({ handleModal, withdrawalModal }) {
  return (
    <div
      className={
        withdrawalModal ? "modal-background" : "modal-background hidden"
      }
    >
      <div className="modal-box">
        <div>⚠️ 회원탈퇴</div>

        <div>
          <p>회원의 모든 정보와 공유 내역이 삭제되며, 복구되지 않습니다.</p>
          <p>
            <br />
            탈퇴하시겠습니까?
          </p>
        </div>

        <div className="button-container">
          <a href="/">
            <button>확인</button>
          </a>
          <button onClick={handleModal}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default Modal_withdrawal;
