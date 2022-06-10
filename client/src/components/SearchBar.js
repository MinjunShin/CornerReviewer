import React, { useState } from "react";
import SerchIconSvg from "../static/SerchIconSvg";
import "./SearchBar.css";
import { Link } from "react-router-dom";

function SearchBar({ movieData }) {
  const [hasText, setDropdown] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    if (e.target.value === "") {
      setDropdown(false);
    } else {
      console.log(e.target.value);
      setInputText(e.target.value);
      setDropdown(true);
    }
  };

  return (
    <div className="searchBar_main">
      <div className="search_bar_wrapper">
        <input
          type="text"
          className="serach_bar"
          placeholder="Search...  "
          onChange={(e) => handleChange(e)}
        />
        <DropDown
          movieData={movieData}
          hasText={hasText}
          inputText={inputText}
          setDropdown={setDropdown}
        />
      </div>
      <button className="search_bar_btn">
        <SerchIconSvg />
      </button>
    </div>
  );
}

export const DropDown = ({ movieData, hasText, setDropdown, inputText }) => {
  const handleClick = (e) => {
    console.log(e.target.id);
    setDropdown(false);
  };

  return (
    <div className="dropdown_wrapper">
      <div className="autoComp">
        {hasText ? (
          movieData.map((el, idx) => {
            const filteredData =
              el.title.indexOf(inputText) > -1 ? el.title : null;
            if (filteredData === null) {
              return null;
            }
            return (
              <Link to={`/movies/${el.id}`} key={idx}>
                <div
                  className="autoComp_item"
                  id={el.id}
                  onClick={(e) => handleClick(e)}
                >
                  {filteredData}
                </div>
              </Link>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
