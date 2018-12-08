import React, { FC, memo, ChangeEvent, useState, useRef } from "react";
import "./SearchBar.css";
import searchImage from "../../assets/images/search-24px.svg";

interface Props {
  query: string;
  onChange: (query: string) => void;
}

const SearchBar: FC<Props> = memo(props => {
  const { query, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <input
      className="SearchBar"
      ref={inputRef}
      placeholder="Search"
      style={{ backgroundImage: `url(${searchImage})` }}
      type="text"
      onChange={handleInputChange}
      value={query}
    />
  );
});

export default SearchBar;
