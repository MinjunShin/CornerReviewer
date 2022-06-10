import React from "react";
import { Link } from "react-router-dom";

function HeaderToggle({
  userInfo,
  toggleOpen,
  setToggleOpen,
  setModal,
  signOut,
}) {
  const clearToggles = () => {
    setModal(false);
    setToggleOpen(false);
  };

  const handleToggle = () => {
    setToggleOpen((toggleOpen) => !toggleOpen);
  };

  return (
    <ul
      className={
        toggleOpen
          ? "link_to_mypage_container open"
          : "link_to_mypage_container close"
      }
    >
      <li className="user_profile_wrapper" onClick={handleToggle}>
        <div className="user_profile">
          <img
            src={
              userInfo.profilepath === null
                ? require("../images/default_profile.png")
                : userInfo.profilepath
            }
            alt=""
            className="profile_img"
          ></img>
        </div>
        <div className="user_id">{userInfo.userId + " 님"}</div>
      </li>

      <ul className={toggleOpen ? "show_menu" : "hide_menu"}>
        <li>
          <Link to="/mypage">
            <div
              className="go_to_mypage_btn toggle_menu"
              onClick={handleToggle}
            >
              마이페이지
            </div>
          </Link>
        </li>
        <li>
          <div
            className="logout_btn toggle_menu toggle_bottom"
            onClick={() => {
              clearToggles();
              signOut();
            }}
          >
            Log out
          </div>
        </li>
      </ul>
    </ul>
  );
}

export default HeaderToggle;
