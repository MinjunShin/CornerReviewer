import React, { useState, useEffect } from "react";
import SignInModal from "./SingInModal";
import { Link } from "react-router-dom";
import HeaderToggle from "./HeaderToggle";
import SearchBar from "./SearchBar";
import "./Header.css";

function Header({
  isSignIn,
  setSignIn,
  handleSignIn,
  userInfo,
  setUserInfo,
  fetchURL,
  movieData,
}) {
  const [showModal, setModal] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 30) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= 30) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const clearToggles = () => {
    setModal(false);
    setToggleOpen(false);
  };

  const handleModal = () => {
    setModal((showModal) => !showModal);
  };

  const signOut = () => {
    setSignIn(false);
    window.sessionStorage.setItem("loggedIn", false);
  };

  return (
    <div className="header_container">
      <div className={scrolled ? "header fix-container" : "header"}>
        <Link to={"/"}>
          <img
            src={require("../images/logo.png")}
            alt="img load fail"
            className="logo"
            onClick={() => {
              clearToggles();
              if (scrolled) {
                window.scrollTo(0, 0);
              }
            }}
          ></img>
        </Link>
        <div className="serach_bar_container pc">
          <SearchBar movieData={movieData} />
        </div>
        {isSignIn ? (
          <HeaderToggle
            toggleOpen={toggleOpen}
            setToggleOpen={setToggleOpen}
            setModal={setModal}
            signOut={signOut}
            userInfo={userInfo}
          />
        ) : (
          <button
            className="sign_in_btn"
            onClick={() => {
              clearToggles();
              handleModal();
            }}
          >
            Sign in
          </button>
        )}
      </div>
      <div className="serach_bar_container mobile">
        <SearchBar movieData={movieData} />
      </div>
      <SignInModal
        handleModal={handleModal}
        showModal={showModal}
        handleSignIn={handleSignIn}
        isSignIn={isSignIn}
        fetchURL={fetchURL}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </div>
  );
}

export default Header;
