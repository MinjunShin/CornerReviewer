import React from "react";
import "./MasonryLayout.css";

function MasonryLayout(props) {
  let scoredDummy = props.movieData.slice(0);
  scoredDummy.map((el) => {
    return (el.score = Math.random() * 5);
  });

  console.log(scoredDummy);
  const highScored = {
    gridColumn: "span 2",
    gridRow: "span 2",
  };

  return (
    <div className="container">
      {scoredDummy.map((el, idx) => {
        return (
          <div
            className="box"
            key={idx}
            style={el.score >= 3 ? highScored : null}
          >
            <img src={el.posters} />
          </div>
        );
      })}
    </div>
  );
}

export default MasonryLayout;
