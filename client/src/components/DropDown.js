import React, { useState } from "react";
import "./DropDown.css";

function DropDown() {
  const [Genre, setGenre] = useState("장르 선택");

  return (
    <div className="dropdown">
      <button type className="dropBtn">
        {Genre}
      </button>
      <div className="dropdown-content">
        <div
          onClick={(el) => {
            setGenre(el.target.innerText);
          }}
        >
          1
        </div>
        <div
          onClick={(el) => {
            setGenre(el.target.innerText);
          }}
        >
          2
        </div>
        <div
          onClick={(el) => {
            setGenre(el.target.innerText);
          }}
        >
          3
        </div>

        <div
          onClick={(el) => {
            setGenre(el.target.innerText);
          }}
        >
          4
        </div>

        <div
          onClick={(el) => {
            setGenre(el.target.innerText);
          }}
        >
          5
        </div>

        <div
          onClick={(el) => {
            setGenre(el.target.innerText);
          }}
        >
          6
        </div>

        <div
          onClick={(el) => {
            setGenre(el.target.innerText);
          }}
        >
          7
        </div>
      </div>
    </div>
  );
}

export default DropDown;
