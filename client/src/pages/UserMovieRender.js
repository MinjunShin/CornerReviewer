import React from "react";
import { Link } from "react-router-dom";

function UserMovieRender({ myGenreData, ref }) {
  return myGenreData.map((el, idx) => {
    return (
      <Link to={`/movies/${el.id}`} key={idx}>
        <div
          boxid={el.id}
          className="movieBox"
          onClick={() => console.log(`divbox idx : ${el.id}`)}
          ref={ref}
        >
          <div className="moviePoster">
            <img
              src={
                el.posterImg === null
                  ? require("../images/no_image.png")
                  : el.posterImg
              }
              alt="no_image"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = require("../images/no_image.png");
              }}
              className="movie_poster_img"
            />
            <div className="movieTitle">{el.title}</div>
          </div>
        </div>
      </Link>
    );
  });
}

export default UserMovieRender;
