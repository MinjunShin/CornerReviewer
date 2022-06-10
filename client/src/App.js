import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import MovieDetail from "./pages/MovieDetail";
import Signup from "./pages/SignUp";
import Mypage_Update from "./pages/MyPage_Update";
import Mypage from "./pages/MyPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Loading from "./components/Loading";
axios.defaults.withCredentials = true;

function App() {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignIn, setSignIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [page, setPage] = useState(1);
  const fetchURL = "https://server.dev.corner-reviewer.ml/";
  //const fetchURL = "http://localhost:80/";
  const verified_userId = window.sessionStorage.getItem("loggedIn");

  useEffect(() => {
    setIsLoading(true);
    const serverData = async () =>
      await axios
        .get(`${fetchURL}main/${page}`)
        .then((res) => {
          console.log(res.data.data.movieInfo);
          setIsLoading(false);
          return setMovieData(res.data.data.movieInfo);
        })
        .catch((err) => {
          return console.log("err :", err);
        });
    serverData();
    IntializeUser();
  }, []);

  console.log("Fetchdata :", movieData);

  const IntializeUser = () => {
    if (window.sessionStorage.getItem("loggedIn")) {
      axios
        .get(`${fetchURL}users/${verified_userId}`)
        .then((res) => {
          console.log("userInfo by SignIn axios :", res.data);
          setUserInfo(res.data);
        })
        .then(() => setSignIn(true))
        .catch((err) => console.log("Initialize User err :", err));
    }
    return console.log("Initialize User Success");
  };

  const handleSignIn = (res, id) => {
    if (res.status === 200) {
      console.log(res);
      console.log("login success!!");
    } else {
      window.sessionStorage.setItem("loggedIn", false);
      return;
    }
    window.sessionStorage.setItem("loggedIn", id);
    console.log(window.sessionStorage.getItem("loggedIn"));
    return setSignIn(true);
  };

  return (
    <div className="App">
      <Router>
        <Header
          isSignIn={isSignIn}
          setSignIn={setSignIn}
          handleSignIn={handleSignIn}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          fetchURL={fetchURL}
          movieData={movieData}
        />
        {isLoading ? (
          <Loading customText={"Loading..."} />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  movieData={movieData}
                  setMovieData={setMovieData}
                  fetchURL={fetchURL}
                  page={page}
                  setPage={setPage}
                  userInfo={userInfo}
                  isSignIn={isSignIn}
                />
              }
            ></Route>
            <Route
              path="/movies/:id"
              element={
                <MovieDetail
                  movieData={movieData}
                  fetchURL={fetchURL}
                  isSignIn={isSignIn}
                  userInfo={userInfo}
                />
              }
            ></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/mypage_update" element={<Mypage_Update />}></Route>
            <Route
              path="/mypage"
              element={<Mypage movieData={movieData} />}
            ></Route>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
