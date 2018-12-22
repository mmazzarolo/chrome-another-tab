import React, { FC, memo, ChangeEvent, useRef } from "react";
import styled from "styled-components/macro";
import "./SearchBar.css";
import searchImage from "../assets/images/search-24px.svg";

interface Props {
  query: string;
  onChange: (query: string) => void;
}

export const SearchBar: FC<Props> = memo(props => {
  const { query, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <Input
      ref={inputRef}
      placeholder="Search"
      style={{ backgroundImage: `url(${searchImage})` }}
      type="text"
      onChange={handleInputChange}
      value={query}
    />
  );
});

const Input = styled.input`
  width: 320px;
  height: 34px;
  border-radius: 21px;
  background-color: white;
  font-size: 22px;
  transition: all 0.6s ease-out;
  margin: 20px;
  padding: 4px 10px;
  background-repeat: no-repeat;
  background-size: 24px;
  color: #282c34;
  background-position: 300px;
  border: none;
  text-align: center;
  background-color: #f0f0f0;

  &:hover:focus {
    outline: 0;
  }

  &:hover::placeholder {
    font-size: 22px;
  }
`;
